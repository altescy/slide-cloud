package frontend

import (
	"embed"
	"io/fs"
)

//go:embed dist/*
var content embed.FS

func GetStaticAssets() fs.FS {
	sub, err := fs.Sub(content, "dist")
	if err != nil {
		panic(err)
	}
	return sub
}
