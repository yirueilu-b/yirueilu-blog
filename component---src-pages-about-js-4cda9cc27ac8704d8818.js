(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"3XHS":function(e,t,a){"use strict";a.r(t);var n=a("dI71"),r=a("q1tI"),i=a.n(r),o=a("H2TA"),s=a("Ji2X"),c=a("tRbT");function l(){return Object(r.useEffect)((function(){window.scrollTo(0,0)}),[]),null}var m=a("ofer"),d=a("kKU3"),u=a("R/WZ"),g=a("wx14"),f=a("Ff2n"),p=a("iuhU"),h=a("HR5l");var v,b,y=(v=r.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),(b=function(e,t){return i.a.createElement(h.a,Object(g.a)({ref:t},e),v)}).muiName=h.a.muiName,i.a.memo(i.a.forwardRef(b)));var x=r.forwardRef((function(e,t){var a=e.alt,n=e.children,i=e.classes,o=e.className,s=e.component,c=void 0===s?"div":s,l=e.imgProps,m=e.sizes,d=e.src,u=e.srcSet,h=e.variant,v=void 0===h?"circle":h,b=Object(f.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),x=null,E=function(e){var t=e.src,a=e.srcSet,n=r.useState(!1),i=n[0],o=n[1];return r.useEffect((function(){if(t||a){o(!1);var e=!0,n=new Image;return n.src=t,n.srcSet=a,n.onload=function(){e&&o("loaded")},n.onerror=function(){e&&o("error")},function(){e=!1}}}),[t,a]),i}({src:d,srcSet:u}),j=d||u,w=j&&"error"!==E;return x=w?r.createElement("img",Object(g.a)({alt:a,src:d,srcSet:u,sizes:m,className:i.img},l)):null!=n?n:j&&a?a[0]:r.createElement(y,{className:i.fallback}),r.createElement(c,Object(g.a)({className:Object(p.a)(i.root,i.system,i[v],o,!w&&i.colorDefault),ref:t},b),x)})),E=Object(o.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(x),j=a("kKAo"),w=r.forwardRef((function(e,t){var a=e.classes,n=e.className,i=e.raised,o=void 0!==i&&i,s=Object(f.a)(e,["classes","className","raised"]);return r.createElement(j.a,Object(g.a)({className:Object(p.a)(a.root,n),elevation:o?8:1,ref:t},s))})),I=Object(o.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(w),N=a("VD++"),k=r.forwardRef((function(e,t){var a=e.children,n=e.classes,i=e.className,o=e.focusVisibleClassName,s=Object(f.a)(e,["children","classes","className","focusVisibleClassName"]);return r.createElement(N.a,Object(g.a)({className:Object(p.a)(n.root,i),focusVisibleClassName:Object(p.a)(o,n.focusVisible),ref:t},s),a,r.createElement("span",{className:n.focusHighlight}))})),S=Object(o.a)((function(e){return{root:{display:"block",textAlign:"inherit",width:"100%","&:hover $focusHighlight":{opacity:e.palette.action.hoverOpacity},"&$focusVisible $focusHighlight":{opacity:.12}},focusVisible:{},focusHighlight:{overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:e.transitions.create("opacity",{duration:e.transitions.duration.short})}}}),{name:"MuiCardActionArea"})(k),O=["video","audio","picture","iframe","img"],B=r.forwardRef((function(e,t){var a=e.children,n=e.classes,i=e.className,o=e.component,s=void 0===o?"div":o,c=e.image,l=e.src,m=e.style,d=Object(f.a)(e,["children","classes","className","component","image","src","style"]),u=-1!==O.indexOf(s),h=!u&&c?Object(g.a)({backgroundImage:'url("'.concat(c,'")')},m):m;return r.createElement(s,Object(g.a)({className:Object(p.a)(n.root,i,u&&n.media,-1!=="picture img".indexOf(s)&&n.img),ref:t,style:h,src:u?c||l:void 0},d),a)})),R=Object(o.a)({root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"},img:{objectFit:"cover"}},{name:"MuiCardMedia"})(B),T=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={},a}Object(n.a)(t,e);var a=t.prototype;return a.componentDidMount=function(){},a.render=function(){var e=this.props.classes;return i.a.createElement(s.a,{className:e.root},i.a.createElement(l,null),i.a.createElement(c.a,{className:e.content,container:!0,spacing:0,direction:"row",alignItems:"flex-start",justify:"center"},i.a.createElement(c.a,{className:e.profile,container:!0,item:!0,xs:12,justify:"flex-start"},i.a.createElement(C,null)),i.a.createElement(c.a,{className:e.experience,container:!0,item:!0,xs:12,justify:"flex-start"},i.a.createElement(P,null)),i.a.createElement(c.a,{className:e.project,container:!0,item:!0,xs:12,justify:"flex-start"},i.a.createElement(z,null))))},t}(i.a.Component),A=Object(u.a)((function(e){return{root:{marginBottom:48,"& * h5":{fontWeight:500}},left:{textAlign:"center"},right:{textAlign:"left"},right1:{},right2:{marginTop:24},avatar:{margin:e.spacing(5),width:e.spacing(15),height:e.spacing(15)}}}));function C(e){var t=A();return i.a.createElement(d.a,{in:!0,timeout:3e3},i.a.createElement(c.a,{className:t.root,container:!0,spacing:0,alignItems:"center",justify:"center"},i.a.createElement(c.a,{className:t.left,container:!0,item:!0,xs:12,md:4,justify:"center",alignItems:"center"},i.a.createElement(E,{className:t.avatar})),i.a.createElement(c.a,{className:t.right,container:!0,item:!0,xs:12,md:8,justify:"flex-start"},i.a.createElement(c.a,{container:!0,item:!0,xs:12,justify:"flex-start",alignItems:"flex-start"},i.a.createElement(m.a,{gutterBottom:!0,variant:"h5"},"About Me"),i.a.createElement(m.a,{gutterBottom:!0,variant:"subtitle1"},"I am a software engineer in Institute for Information Industry ( III ) and I am responsible for developing web applications and researching the latest deep learning algorithms.")),i.a.createElement(c.a,{className:t.right2,container:!0,item:!0,xs:12,justify:"flex-start",alignItems:"flex-start"},i.a.createElement(m.a,{gutterBottom:!0,variant:"h5"},"Skills"),i.a.createElement(m.a,{gutterBottom:!0,variant:"subtitle1"},"Skilled in Python and JavaScript, Hands-on experience in Django and Flask, Familiar with Deep Learning algorithms, Hands-on experience in Tensorflow and Keras, Strong background knowledge of Computer Science")))))}var L=Object(u.a)((function(e){return{root:{marginBottom:48,"& * h4, & * h5":{fontWeight:500}},title:{borderBottom:"1px solid "+e.palette.divider,marginTop:48,textAlign:"left"},detail:{marginTop:24,textAlign:"left","& * h4, & * h5":{fontWeight:500}},logo:{marginTop:24},avatarLogo:{backgroundColor:"dark"===e.palette.type?"rgba(250, 250, 250, 0.87)":"rgba(187, 187, 187,0.87)",width:e.spacing(12),height:e.spacing(12),marginTop:24}}}));function P(){var e=L();return i.a.createElement(d.a,{in:!0,timeout:3e3},i.a.createElement(c.a,{className:e.root,container:!0,spacing:0,alignItems:"flex-start",justify:"flex-start"},i.a.createElement(c.a,{className:e.title,container:!0,item:!0,xs:12,justify:"flex-start",alignItems:"flex-start"},i.a.createElement(m.a,{gutterBottom:!0,variant:"h4"},"Work Experience")),i.a.createElement(c.a,{container:!0,item:!0,xs:12,justify:"flex-start",alignItems:"flex-start"},i.a.createElement(c.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},i.a.createElement(c.a,{className:e.logo,container:!0,item:!0,xs:12,md:3,justify:"center"},i.a.createElement(E,{className:e.avatarLogo,alt:"Institute for Information Industry",src:"https://www.dtataiwan.org/img/back/original/aboutMember2/2020-06-30/20200630151150218.png"})),i.a.createElement(c.a,{className:e.detail,item:!0,xs:12,md:9},i.a.createElement(m.a,{gutterBottom:!0,variant:"h5"},"Institute for Information Industry"),i.a.createElement(m.a,{gutterBottom:!0,variant:"subtitle1"},"Software Engineer, 09/2018 - PRESENT"),i.a.createElement(m.a,{gutterBottom:!0,variant:"body1"},"As a software engineer in Institute for Information Industry, my job is to research and implement the latest and the state of the art Machine Learning algorithms and optimize them to make them possible applying in real world environment."))),i.a.createElement(c.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},i.a.createElement(c.a,{className:e.logo,container:!0,item:!0,xs:12,md:3,justify:"center"},i.a.createElement(E,{className:e.avatarLogo,alt:"Institute of Information Science, Academia Sinica",src:"https://d13i5xhouzkrd.cloudfront.net/assets/publisher-logos/logo-asiis-color.png"})),i.a.createElement(c.a,{className:e.detail,item:!0,xs:12,md:9},i.a.createElement(m.a,{display:"block",gutterBottom:!0,variant:"h5"},"Institute of Information Science, Academia Sinica"),i.a.createElement(m.a,{gutterBottom:!0,variant:"subtitle1"},"Intern, 06/2016 - 09/2016"),i.a.createElement(m.a,{display:"block",gutterBottom:!0,variant:"body1"},"During the internship, I studied the research papers about Air Quality Index ( AQI ) inference system, tried to increase performance of the regression model and visualize the result using javascript.")))),i.a.createElement(c.a,{className:e.title,container:!0,item:!0,xs:12,md:12,justify:"flex-start",alignItems:"flex-start"},i.a.createElement(m.a,{gutterBottom:!0,variant:"h4"},"Education")),i.a.createElement(c.a,{container:!0,item:!0,xs:12,md:12,justify:"flex-start"},i.a.createElement(c.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},i.a.createElement(c.a,{className:e.logo,container:!0,item:!0,xs:12,md:3,justify:"center"},i.a.createElement(E,{className:e.avatarLogo,alt:"Institute for Information Industry",src:"https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/NCTU_emblem.svg/1200px-NCTU_emblem.svg.png"})),i.a.createElement(c.a,{className:e.detail,item:!0,xs:12,md:9},i.a.createElement(m.a,{gutterBottom:!0,variant:"h5"},"National Chiao Tung University"),i.a.createElement(m.a,{gutterBottom:!0,variant:"subtitle1"},"MS, Computer Science, 09/2015 - 06/2018"),i.a.createElement(m.a,{gutterBottom:!0,variant:"body1"},"Focused on Machine Learning, research the stock price prediction using Deep Learning. My thesis is Stock Price Prediction Using Deep Learning and Sentiment Analysis. This paper studied the correlation between posts on forum and the prediction result using LSTM. The result shows that the plenty text information on the internet could increase the accuracy of stock price prediction."))),i.a.createElement(c.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},i.a.createElement(c.a,{className:e.logo,container:!0,item:!0,xs:12,md:3,justify:"center"},i.a.createElement(E,{className:e.avatarLogo,alt:"Institute for Information Industry",src:"https://wwwtve.ntut.edu.tw/var/file/90/1090/msys_1090_3212376_26605.png"})),i.a.createElement(c.a,{className:e.detail,item:!0,xs:12,md:9},i.a.createElement(m.a,{gutterBottom:!0,variant:"h5"},"National Taipei University of Technology"),i.a.createElement(m.a,{gutterBottom:!0,variant:"subtitle1"},"BS, Electrical Engineering, 04/2011 - 07/2015"),i.a.createElement(m.a,{gutterBottom:!0,variant:"body1"},"Project about human face recognition. Use computer vision algorithms to process face image and find key points of face then convert the key points into vectors for comparing among different users. The Project is a comprehensive access control system, which integrates with RFID tag and embedded hardware."))))))}var M=Object(u.a)((function(e){var t;return{root:{marginBottom:48,"& * h4, & * h5":{fontWeight:500}},card_root:{marginTop:48},title:{borderBottom:"1px solid "+e.palette.divider,marginTop:48,textAlign:"left"},card_content:{height:"100%"},detail:(t={padding:"24px 0 0 0"},t[e.breakpoints.up("md")]={padding:"0 0 0 48px"},t.textAlign="left",t["& * h4, & * h5"]={fontWeight:500},t)}})),_=[{image:"https://i.imgur.com/AeXxSiX.gif",title:"Real-time Hand Gesture Recognition System",description:"Train detection model and classification model to detect hands and classify the gesture then use the result to create an interface which could control cursor with hands directly"},{image:{}.PUBLIC_URL+"/project_image/catSegmentation.png",title:"Cat Segmentation",description:"Use different segmentation models such as U-net and LinkNet and Oxford-IIIT Pet Dataset to train a cat segmentation model"},{image:"https://tvblog-static.tradingview.com/uploads/2018/03/Poloniex_logo_2-1024x512.png",title:"BTC Auto Trading Bot",description:"Build a auto trading bot using Poloniex API and trading with simple moving average strategy"}];function z(e){for(var t=M(),a=[],n=0;n<_.length;n++)a.push(i.a.createElement(c.a,{className:t.card_root,key:n,container:!0,item:!0,xs:12,justify:"flex-start",alignItems:"flex-start"},i.a.createElement(c.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},i.a.createElement(c.a,{className:t.logo,container:!0,item:!0,xs:12,md:3,justify:"center"},i.a.createElement(I,{raised:!0},i.a.createElement(S,{className:t.card_content},i.a.createElement(R,{component:"img",alt:"Contemplative Reptile",height:"168",image:_[n].image,title:_[n].title})))),i.a.createElement(c.a,{className:t.detail,item:!0,xs:12,md:9},i.a.createElement(m.a,{gutterBottom:!0,variant:"h5"},_[n].title),i.a.createElement(m.a,{gutterBottom:!0,variant:"body1"},_[n].description)))));return i.a.createElement(d.a,{in:!0,timeout:3e3},i.a.createElement(c.a,{className:t.root,container:!0,spacing:0,alignItems:"flex-start",justify:"flex-start"},i.a.createElement(c.a,{className:t.title,container:!0,item:!0,xs:12,justify:"flex-start",alignItems:"flex-start"},i.a.createElement(m.a,{gutterBottom:!0,variant:"h4"},"Recent Projects")),a))}var D=Object(o.a)((function(e){var t,a,n;return{root:{display:"flex",padding:0,maxWidth:"100vw"},content:{},profile:(t={padding:"5vh 10vw"},t[e.breakpoints.up("sm")]={paddingLeft:"26vw",paddingRight:"26vw"},t.backgroundImage="dark"===e.palette.type?"url(https://thumbs.gfycat.com/UnequaledLazyGrayreefshark-size_restricted.gif)":"url(https://thumbs.gfycat.com/FrightenedNaughtyDarwinsfox-size_restricted.gif)",t.backgroundSize="cover",t.backgroundRepeat="no-repeat",t.backgroundPosition="center",t),experience:(a={padding:"5vh 10vw"},a[e.breakpoints.up("sm")]={paddingLeft:"26vw",paddingRight:"26vw"},a.backgroundColor=e.palette.background.paper,a),project:(n={padding:"5vh 10vw"},n[e.breakpoints.up("sm")]={paddingLeft:"26vw",paddingRight:"26vw"},n)}}))(T),U=a("7oih"),H=function(e){function t(t){return e.call(this,t)||this}Object(n.a)(t,e);var a=t.prototype;return a.componentDidMount=function(){},a.render=function(){return i.a.createElement(U.a,null,i.a.createElement(D,null))},t}(i.a.Component);t.default=Object(o.a)({root:{flexGrow:1,maxWidth:"100vw",minHeight:"100vh",padding:0,textAlign:"center"}})(H)}}]);
//# sourceMappingURL=component---src-pages-about-js-4cda9cc27ac8704d8818.js.map