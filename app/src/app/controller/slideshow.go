package controller

import (
	"fmt"
	"html/template"
	"net/http"

	"app/model"

	"github.com/julienschmidt/httprouter"
)

func (h *Handler) GetSlideshow(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	var slide *model.Slide
	user, err := h.userByRequest(r)
	if err != nil {
		slide, err = model.GetPublicSlideByAccessToken(h.db, p.ByName("token"))
	} else {
		slide, err = model.GetAvailableSlideByUserIDAndAccessToken(h.db, user.ID, p.ByName("token"))
	}
	switch {
	case err == model.ErrSlideNotFound:
		w.WriteHeader(404)
		fmt.Fprintf(w, "<h1>Slide Not Found</h1>")
	case err != nil:
		h.handleError(w, err, 500)
	default:
		funcMap := template.FuncMap{
			"safehtml": func(text string) template.HTML { return template.HTML(text) },
		}
		templates := template.Must(template.New("slideshow").Funcs(funcMap).ParseFiles("controller/templates/slideshow.html"))
		if err = templates.ExecuteTemplate(w, "revealjs", slide); err != nil {
			h.handleError(w, err, 500)
		}
	}

}
