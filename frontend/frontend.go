package frontend

import (
	"net/http"
	"strings"

	assetfs "github.com/elazarl/go-bindata-assetfs"
)

type BinaryFS struct {
	fs http.FileSystem
}

func (b *BinaryFS) Open(name string) (http.File, error) {
	return b.fs.Open(name)
}

func (b *BinaryFS) Exists(prefix string, filepath string) bool {
	if p := strings.TrimPrefix(filepath, prefix); len(p) < len(filepath) {
		if _, err := b.fs.Open(p); err != nil {
			return false
		}
		return true
	}
	return false
}

func NewBinaryFS() *BinaryFS {
	fs := &assetfs.AssetFS{
		Asset:     Asset,
		AssetDir:  AssetDir,
		AssetInfo: AssetInfo,
		Prefix:    "/build",
	}
	return &BinaryFS{
		fs,
	}
}
