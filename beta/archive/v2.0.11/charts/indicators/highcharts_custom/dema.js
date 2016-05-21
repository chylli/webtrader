define(["indicator_base","highstock"],function(a){function b(b){var c=b.data[b.index].x||b.data[b.index][0],d=(a.getPrice(b.data,b.index,b.appliedTo,b.type),{data:b.data,maData:e[b.key],index:b.index,period:b.period,type:b.type,appliedTo:b.appliedTo,isIndicatorData:!1}),g=a.calculateEMAValue(d);b.isPointUpdate?e[b.key][b.index]=[c,g]:e[b.key].push([c,g]);var h={data:e[b.key],maData:f[b.key],index:b.index,period:b.period,type:b.type,appliedTo:b.appliedTo,isIndicatorData:!0},i=a.calculateEMAValue(h);return b.isPointUpdate?f[b.key][b.index]=[c,i]:f[b.key].push([c,i]),2*g-i}var c={},d={},e={},f={};return{init:function(){!function(a,g,h){function i(a,e){var f=this,g=f.chart;for(var i in d)if(d[i]&&d[i].options&&d[i].options.data&&d[i].options.data.length>0&&c[i].parentSeriesID==f.options.id&&d[i].chart===g){var j=f.options.data,k=c[i],l=h.findIndexInDataForTime(j,a);if(l>=1){var m={data:j,index:l,period:k.period,type:this.options.type,key:i,isPointUpdate:e,appliedTo:k.appliedTo},n=b(m);e?d[i].data[l].update({y:h.toFixed(n,4)}):d[i].addPoint([j[l].x||j[l][0],h.toFixed(n,4)],!0,!0,!1)}}}a&&!a.Series.prototype.addDEMA&&(a.Series.prototype.addDEMA=function(a){var i=this.options.id;a=g.extend({period:21,stroke:"red",strokeWidth:2,dashStyle:"line",levels:[],appliedTo:h.CLOSE,parentSeriesID:i},a);var j="_"+(new Date).getTime(),k=this.options.data||[];if(!(a.period>=k.length)){if(k&&k.length>0){var l=[];e[j]=[],f[j]=[];for(var m=0;m<k.length;m++){var n={data:k,index:m,period:a.period,type:this.options.type,key:j,isPointUpdate:!1,appliedTo:a.appliedTo},o=b(n);l.push([k[m].x||k[m][0],h.toFixed(o,4)])}var p=this.chart;c[j]=a;var q=this;d[j]=p.addSeries({id:j,name:"DEMA ("+a.period+", "+h.appliedPriceString(a.appliedTo)+")",data:l,type:"line",dataGrouping:q.options.dataGrouping,opposite:q.options.opposite,color:a.stroke,lineWidth:a.strokeWidth,dashStyle:a.dashStyle,compare:q.options.compare},!1,!1),g(d[j]).data({onChartIndicator:!0,indicatorID:"dema",isIndicator:!0,parentSeriesID:a.parentSeriesID,period:a.period}),p.redraw()}return j}},a.Series.prototype.removeDEMA=function(a){var b=this.chart;c[a]=null,b.get(a).remove(),d[a]=null,e[a]=[],f[a]=[]},a.Series.prototype.preRemovalCheckDEMA=function(a){return{isMainIndicator:!0,period:c[a]?c[a].period:void 0,appliedTo:c[a]?c[a].appliedTo:void 0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,f){a.call(this,b,d,e,f),h.checkCurrentSeriesHasIndicator(c,this.options.id)&&i.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),h.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&i.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});