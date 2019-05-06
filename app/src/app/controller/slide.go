package controller

import (
	"database/sql"
	"net/http"

	"app/model"

	"github.com/julienschmidt/httprouter"
	"github.com/pkg/errors"
)

func (h *Handler) GetSlides(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	user, err := h.userByRequest(r)
	if err != nil {
		h.handleError(w, err, 401)
		return
	}
	withoutContent := r.FormValue("without_content")
	var slides []*model.Slide
	if withoutContent == "1" {
		slides, err = model.GetSlidesWithoutContentByUserID(h.db, user.ID)
	} else {
		slides, err = model.GetSlidesByUserID(h.db, user.ID)
	}
	if err != nil {
		h.handleError(w, err, 500)
	}
	h.handleSuccess(w, slides)
}

func (h *Handler) AddSlide(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	name := r.FormValue("name")
	content := r.FormValue("content")
	if name == "" || content == "" {
		h.handleError(w, errors.New("all parameters are required"), 400)
		return
	}
	user, err := h.userByRequest(r)
	if err != nil {
		h.handleError(w, err, 401)
		return
	}
	var slide *model.Slide
	err = h.txScope(func(tx *sql.Tx) (err error) {
		slide, err = model.AddSlide(tx, user.ID, name, content)
		return
	})
	switch {
	case err == model.ErrSlideConflict:
		h.handleError(w, err, 409)
	case err == model.ErrNoAvailableToken:
		h.handleError(w, err, 503)
	case err != nil:
		h.handleError(w, err, 500)
	default:
		h.handleSuccess(w, slide)
	}
}

func (h *Handler) GetSlide(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	var slide *model.Slide
	user, err := h.userByRequest(r)
	if err != nil {
		slide, err = model.GetPublicSlideByAccessToken(h.db, p.ByName("token"))
	} else {
		slide, err = model.GetAvailableSlideByUserIDAndAccessToken(h.db, user.ID, p.ByName("token"))
	}
	switch {
	case err == model.ErrSlideNotFound:
		h.handleError(w, err, 400)
	case err != nil:
		h.handleError(w, err, 500)
	default:
		h.handleSuccess(w, slide)
	}
}

func (h *Handler) UpdateSlide(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	user, err := h.userByRequest(r)
	if err != nil {
		h.handleError(w, err, 401)
		return
	}
	params := map[string]string{}
	for _, k := range []string{"public", "name", "content"} {
		if v := r.FormValue(k); v != "" {
			params[k] = v
		}
	}
	var slide *model.Slide
	err = h.txScope(func(tx *sql.Tx) (err error) {
		slide, err = model.UpdateSlide(tx, user.ID, p.ByName("token"), params)
		return
	})
	switch {
	case err == model.ErrSlideConflict:
		h.handleError(w, err, 409)
	case err == model.ErrSlideNotFound:
		h.handleError(w, err, 404)
	case err != nil:
		h.handleError(w, err, 500)
	default:
		h.handleSuccess(w, slide)
	}
}

func (h *Handler) DeleteSlide(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	user, err := h.userByRequest(r)
	if err != nil {
		h.handleError(w, err, 401)
		return
	}
	err = h.txScope(func(tx *sql.Tx) error {
		return model.DeleteSlide(tx, user.ID, p.ByName("token"))
	})
	switch {
	case err == model.ErrSlideNotFound:
		h.handleError(w, err, 404)
	case err != nil:
		h.handleError(w, err, 500)
	default:
		h.handleSuccess(w, struct{}{})
	}
}
