Main Tasks 

1. Add Webpack to the project (+2 points)

Add package.json and install webpack with its plugins and loaders
Add webpack.config.js
Use html-webpack-plugin
Use webpack-dev-server
Add css-loader and style-loader to webpack config
 2. Split the project into components: (+1 point)

Declare each component (e.g. class List or function List ) in its own file (List.js)
Extract component related css rules to a corresponding file (List.css)
Use import './List.css'  in List.js to bundle them together

3. Move the project to typescript. (+2 points)

Add tsconfig.json file and configure ts-loader to webpack
Change all .js file extensions to .ts
Use noImplicitAny flag in the configuration.compilerOptions
Try to avoid `explicit any` in the code
Declare object interfaces in a separate file

Optional Task

 4. Add typings to the function `flatten` (+1 point) 

Take the getFlattenedArray function (Exercise 22 from HW4) and add types for arguments and the return value. In Ex.22 the function works only with numbers. Notice that the new function should work with arrays of any possible types (should be polymorphic, use generics). 

Do this part of the homework in https://www.typescriptlang.org/play and put the URL (share button on the top panel) with the solution to your PR with this HW.