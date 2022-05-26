export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

export const gtagScript = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`

export const snippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', '${GTM_ID}');
`

function gtag() {dataLayer.push(arguments)}

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}

export const customEvent = (eventName, data) => {
  window.dataLayer.push({
    event: eventName,
    ...data
  })
}

export const optimizeCallback = () => {
  console.log('Sending optimize event to GTM')
  gtag('event', 'optimize.callback', {
    callback: (value, name) => {
      console.log('EVENT CALLBACK FROM OPTIMIZE')
      console.log(
        'Experiment with ID: ' + name + ' is on variant: ' + value
      );
    },
  });
}

