
var xItemIDs={"28": "83c2088d_dfb1117d_0.html"
	, "29": "83c4088e_d4b40fe9_0.html"
	, "30": "83c6088f_bcb02f4_0.html"
	, "31": "83c80890_11c803a4_0.html"
	, "32": "83ca0891_880027b_0.html"
	, "33": "83cc0892_9160295_0.html"
	, "34": "957f08f1_161f040f_0.html"
	, "21": "e52d0b39_1634041d_0.html"
	, "20": "e52b0b38_24b1054b_0.html"
	, "22": "fc2a0b97_54c01d8_0.html"
	, "23": "fc2c0b98_569d0aa4_0.html"
	, "26": "fc2e0b99_fc20439_0.html"
	, "19": "e5290b37_248d053c_0.html"
	, "24": "fc260b96_55601da_0.html"
	, "25": "fc280b97_569d0aa4_0.html"
	, "27": "fc2a0b98_fc20439_0.html"};

var xBkmkIDs={};

$(document).ready(function(){

	var _urlTarget=function(sHref){
		var sUrl;
		var m=sHref.match(/^nyf:\/\/entry\?itemid=(\d+)/i);
		if(m && m.length>1){
			var sFn=xItemIDs[m[1]];
			if(sFn){
				sUrl=sFn;
			}else{
				alert('Cannot locate the target webpage. \n\n' + sHref);
			}
			if(!sUrl) sUrl='';
		}else{
			m=sHref.match(/^nyf:\/\/entry\?bmid=(\d+)/i);
			if(m && m.length>1){
				var sBmID=m[1];
				if(sBmID){
					var v=(xBkmkIDs[sBmID]||'').split('\t');
					if(v && v.length>2){
						var sItemID=parseInt(v[0]), sSsgName=v[1], sAnchor=v[2];
						var sFn=xItemIDs[sItemID];
						if(sFn){
							sUrl=sFn + '#' + sAnchor;
						}else{
							alert('Cannot locate the target webpage. \n\n' + sHref);
						}
					}
				}
				if(!sUrl) sUrl='';
			}
		}
		return sUrl;
	};

	var linkOf=function(p){
		var sUri='';
		while(p && !sUri){
			sUri=p.href||'';
			p=p.parentNode;
		}
		return sUri;
	};

	$('a').click(function(e){
		//2018.4.5 the target element could be a <SPAN> inside of <a>
		var sHref=linkOf(e.target);
		if(sHref){
			var sUrl=_urlTarget(sHref);
			if(sUrl){
				document.location.href=sUrl;
				return false;
			}else if(sUrl===''){
				return false; //2017.10.21 bad nyf:// links;
			}else{
				window.open(sHref);
				return false;
			}
		}else{
			return false;
		}
	});

});
