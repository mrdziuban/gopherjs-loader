package main

import (
	"github.com/gopherjs/gopherjs/js"
)

func main() {
	js.Global.Get("document").Call("getElementById", "container").Set("innerHTML", "Hello World")
}
