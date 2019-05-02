package main

import (
	"app/controller"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	gctx "github.com/gorilla/context"
	"github.com/gorilla/sessions"
	"github.com/julienschmidt/httprouter"
)

const (
	SessionSecret = "session_secret"
)

func init() {
	var err error
	loc, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		log.Panicln(err)
	}
	time.Local = loc
}

func getEnv(key, def string) string {
	if v, ok := os.LookupEnv("SC_" + key); ok {
		return v
	}
	return def
}

func main() {
	var (
		port   = getEnv("APP_PORT", "5000")
		dbhost = getEnv("DB_HOST", "127.0.0.1")
		dbport = getEnv("DB_PORT", "13306")
		dbuser = getEnv("DB_USER", "root")
		dbpass = getEnv("DB_PASSWORD", "root")
		dbname = getEnv("DB_NAME", "slidecloud")
	)

	dbusrpass := dbuser
	if dbpass != "" {
		dbusrpass += ":" + dbpass
	}

	dsn := fmt.Sprintf(`%s@tcp(%s:%s)/%s?parseTime=true&loc=Local&charset=utf8mb4`, dbusrpass, dbhost, dbport, dbname)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("mysql connect failed. err: %s", err)
	}
	store := sessions.NewCookieStore([]byte(SessionSecret))

	h := controller.NewHandler(db, store)

	router := httprouter.New()
	router.POST("/signup", h.Signup)
	router.POST("/signin", h.Signin)
	router.POST("/signout", h.Signout)
	router.GET("/slides", h.GetSlides)
	router.GET("/slide/:token", h.GetSlide)
	router.POST("/slide", h.AddSlide)
	router.PUT("/slide/:token", h.UpdateSlide)
	router.DELETE("/slide/:token", h.DeleteSlide)
	// router.GET("/slide/:token/commit/:id", h.GetHistory)
	// router.POST("/slide/:token/commit", h.AddHistory)
	// router.PATCH("/slide/:token/commit/:id", h.ModifyHistory)
	// router.DELETE("/slide/:token/commit/:id", h.DeleteHistory)
	// router.GET("/image/:token", h.GetImage)
	// router.POST("/image", h.AddImage)

	addr := ":" + port
	log.Printf("[INFO] start server %s", addr)
	log.Fatal(http.ListenAndServe(addr, gctx.ClearHandler(h.CommonMiddleware(router))))
}
