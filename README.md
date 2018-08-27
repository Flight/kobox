# KOBOX

## Quick start for developers
Project uses node + Gulp for fast developing.

To install node: https://nodejs.org/en/

Then open your favorite Terminal and run these commands.
```
npm install --global gulp-cli
npm install
```

### To watch everything (html + scss + assets + js):
`
gulp watch
`

### To compile everything:
`
gulp
`

### To compile scss:
`
gulp scss
`

### To run webserver with livereload:
`
gulp webserver
`

### To push changes to github pages
`
git subtree push --prefix dist origin gh-pages
`