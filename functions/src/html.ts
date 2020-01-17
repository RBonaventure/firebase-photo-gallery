const default_template = { html: `<!DOCTYPE html>
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
  <link rel="stylesheet" href="css/themes/default/style.css">
  
  <script src="/__/firebase/7.7.0/firebase-app.js"></script>
  <script src="/__/firebase/7.7.0/firebase-performance.js"></script>
  <script src="/__/firebase/init.js"></script>

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

  <script  src="js/themes/default/index.js"></script>

</body>

</html>`,
root: '<a class="img-w" href={{href}}> <img src="{{src}}" alt="" /> </a>'}
 
const fullwidth_video_template = { html: `<!DOCTYPE html>
<html lang="en">
    <head>

        <meta charset="UTF-8">
        <meta name="theme-color" content="#ffffff">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:title" content="{{og:title}}" />
        <meta property="og:description" content="{{og:description}}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{og:url}}" />
        <meta property="og:image" content="{{og:image}}" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title>{{header}}</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">

        <link rel="stylesheet" href="css/themes/fullwidth_video/bootstrap.min.css">
        <link rel="stylesheet" href="css/themes/fullwidth_video/style.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit:100,200,300,400,500,600,700,800,900">
        
        <script src="/__/firebase/7.7.0/firebase-app.js"></script>
        <script src="/__/firebase/7.7.0/firebase-performance.js"></script>
        <script src="/__/firebase/init.js"></script>

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

    <div id="video-container">
        <div class="video-overlay"></div>
        <div class="video-content">
            <div class="inner">
                <h1>{{title}}</h1>
                <p>{{description}}</p>
                
                <div class="scroll-icon">
                    <a class="scrollTo" data-scrollTo="portfolio" href="#"><img src="img/scroll-icon.png" alt=""></a>
                </div>
            </div>
        </div>
        <video autoplay="" loop="" muted>
        	<source src="highway-loop.mp4" type="video/mp4" />
        </video>
    </div>

    <div class="full-screen-portfolio" id="portfolio">
        <div class="container-fluid">
          {{root}}
        </div>
    </div>

    <footer>
        <div class="container-fluid">
            <div class="col-md-12">
                <p>{{credit}}</p>
            </div>
        </div>
    </footer>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
    
    <script src="js/themes/fullwidth_video/index.js"></script>
    
</body>
</html>`,
root: `
<div class="col-md-4 col-sm-6">
  <div class="portfolio-item">
      <a href="{{href}}">
          <div class="hover-effect">
              <div class="hover-content">
                  <h1>{{text}}</h1>
                  <p>{{subtext}}</p>
              </div>
          </div>
          <div class="image">
              <img src="{{src}}">
          </div>
      </a>
  </div>
</div>`}

export { default_template, fullwidth_video_template };