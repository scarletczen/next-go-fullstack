FROM golang:1.21.5-alpine3.19

WORKDIR /app

COPY . .

# Download and install the dependencies
RUN go get -d -v ./...

# Build the go app
RUN go build -o api .

EXPOSE 8000

CMD ["./api"]
