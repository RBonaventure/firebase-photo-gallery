const index = `<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="theme-color" content="#ffffff">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta property="og:title" content="{{og:title}}" />
  <meta property="og:description" content="{{og:description}}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{{og:url}}" />
  <meta property="og:image" content="{{og:image}}" />

  <title>{{header}}</title>
  
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="css/style.css">
  
  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id={{tagmanager_id}}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '{{ga_id}}');
  </script>
</head>

<body>
  
  <div class="title">
    <h1> {{title}} </h1>
    <h2> {{description}} </h2>
    <p> {{credit}} </p>
    <a href="{{instagram}}"> <img style="width: 32px; height: 32px;" src="./assets/instagram.png" /> </a>
    <a href="{{facebook}}"> <img style="width: 32px; height: 32px;" src="./assets/facebook.png" /> </a>
  </div>

  <div class="gallery" id="root">
    {{root}}
  </div>

  <script  src="js/index.js"></script>

</body>

</html>`
 
export { index };