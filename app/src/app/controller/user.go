package controller

import (
	"database/sql"
	"net/http"

	"app/model"

	"github.com/gorilla/sessions"
	"github.com/julienschmidt/httprouter"
	"github.com/pkg/errors"
)

func (h *Handler) Signup(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	name := r.FormValue("name")
	password := r.FormValue("password")
	if name == "" || password == "" {
		h.handleError(w, errors.New("all parameters are required"), 400)
		return
	}
	err := h.txScope(func(tx *sql.Tx) error {
		return model.UserSignup(tx, name, password)
	})
	switch {
	case err == model.ErrUserNotFound:
		// TODO: 失敗が多いときに403を返すBanの仕様に対応
		h.handleError(w, err, 404)
	case err == model.ErrUserConflict:
		h.handleError(w, err, 409)
	case err != nil:
		h.handleError(w, err, 500)
	default:
		h.handleSuccess(w, struct{}{})
	}
}

func (h *Handler) Signin(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	name := r.PostFormValue("name")
	password := r.FormValue("password")
	if name == "" || password == "" {
		h.handleError(w, errors.New("all parameters are required"), 400)
		return
	}
	user, err := model.UserLogin(h.db, name, password)
	switch {
	case err == model.ErrUserNotFound:
		// TODO: 失敗が多いときに403を返すBanの仕様に対応
		h.handleError(w, err, 404)
	case err != nil:
		h.handleError(w, err, 500)
	default:
		session, err := h.store.Get(r, SessionName)
		if err != nil {
			h.handleError(w, err, 500)
			return
		}
		session.Values["user_id"] = user.ID
		if err = session.Save(r, w); err != nil {
			h.handleError(w, err, 500)
			return
		}
		h.handleSuccess(w, user)
	}
}

func (h *Handler) Signout(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	session, err := h.store.Get(r, SessionName)
	if err != nil {
		h.handleError(w, err, 500)
		return
	}
	session.Values["user_id"] = 0
	session.Options = &sessions.Options{MaxAge: -1}
	if err = session.Save(r, w); err != nil {
		h.handleError(w, err, 500)
		return
	}
	h.handleSuccess(w, struct{}{})
}
