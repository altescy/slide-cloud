VERSION 0.8
FROM golang:1.24-alpine
WORKDIR /workdir

deps:
    COPY go.mod go.sum ./
    RUN go mod download
    SAVE ARTIFACT go.mod AS LOCAL go.mod
    SAVE ARTIFACT go.sum AS LOCAL go.sum

build:
    FROM +deps
    COPY api/ ./api/
    COPY cmd/ ./cmd/
    COPY frontend/ ./frontend/
    RUN go build -o slide-cloud cmd/main.go
    SAVE ARTIFACT slide-cloud AS LOCAL slide-cloud

test:
    FROM +deps
    ENV CGO_ENABLED=1
    RUN apk add --no-cache musl-dev gcc build-base
    COPY api/ ./api/
    COPY cmd/ ./cmd/
    COPY frontend/ ./frontend/
    RUN go test github.com/altescy/slide-cloud/...
