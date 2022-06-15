

const isDev = process.env.NODE_ENV === "development"
// const isDev = true


const esbuild = require('esbuild')
// clients bundlers
const {sassPlugin} = require('esbuild-sass-plugin')
const http = require("http");



const buildLoader = {
	'.html': 'text',
	'.jsx': 'jsx',
	'.js': 'jsx',
	".mp3": "file",
	".png": "file",
	".jpg": "file",
	".webp": "file",
	".jpeg": "file",
	".gif": "file",
	".svg": "text",
};

if(isDev){
	
	esbuild.serve({
		servedir: "./app/src/main/assets/dist",
	}, {
		entryPoints: ["./views/index.jsx"],
		bundle: true,
		minify: !isDev,
		sourcemap:  isDev,
		outdir: "./app/src/main/assets/dist",
		// chunkNames: "chunks/[name]",
		// chunkNames: "chunks/[name]-[hash]",
		target: ['chrome90'],
		format:"esm",
		loader: buildLoader,
		jsxFactory: 'h',
		jsxFragment: 'Fragment',
		incremental: false,
		splitting: true,
		plugins: [sassPlugin()]
	})
		.then(result=>{

			const {host, port} = result
			
			// Then start a proxy server on port 3000
			http.createServer((req, res) => {
				const options = {
					hostname: host,
					port: port,
					path: req.url,
					method: req.method,
					headers: req.headers,
				}
				
				// Forward each incoming request to esbuild
				const proxyReq = http.request(options, proxyRes => {
					// If esbuild returns "not found", send a custom 404 page
					if (proxyRes.statusCode === 404) {
						res.writeHead(404, { 'Content-Type': 'text/html' });
						res.end('<h1>A custom 404 page</h1>');
						return;
					}
					
					// Otherwise, forward the response from esbuild to the client
					res.writeHead(proxyRes.statusCode, proxyRes.headers);
					proxyRes.pipe(res, { end: true });
				});
				
				// Forward the body of the request to esbuild
				req.pipe(proxyReq, { end: true });
			}).listen(3000);
			
			
		})
		.catch(ex=>{
			process.exit(1)
			console.log(ex)
		})

	building(true).then(r => {})


} else {

	building(false).then(r => {})

	
}


function building(watch=false){
	return esbuild.build({
		entryPoints: ["views/index.jsx"],
		bundle: true,
		watch: watch,
		minify: true,
		sourcemap:  false,
		// outdir: "out/static",
		outdir: "./app/src/main/assets/dist",
		jsxFactory: 'h',
		jsxFragment: 'Fragment',
		chunkNames: "chunks/[name]-[hash]",
		target: ['chrome90'],
		format:"esm",
		loader: buildLoader,
		incremental: false,
		splitting: true,
		plugins: [sassPlugin()]
	})
	}
