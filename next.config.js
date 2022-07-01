
const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: "\\.(less|css|scss|sass|styl)$"
})

module.exports = removeImports({
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
      // Looks like backward compatibility approach.
  },
  webpack(config, { isServer }) {
    config.resolve.fallback = { 
      fs: false,
      net: false,
      tls:false
    };
   
    return config
  },
  trailingSlash: true,
  images: {
    loader: 'imgix',
    path: '',
  }
})