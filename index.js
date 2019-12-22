

import {colorLegend} from './colorLegend.js'

const svg=d3.select('svg');
const height= +svg.attr('height');
const innerHight=height-200;
const width =+svg.attr('width');
const margin={top:15,right:10,bottom:10,left:10};
const myTitle=(id,txt,x)=>d3.select('div')
     .append("text")  
     .attr('y',margin.top+x)
     .html(txt+"<br/>")
     .attr('id',id); 

myTitle('title','Video Game Sales',10);
myTitle('description',"Top 100 Most Sold Video Games Grouped by Platform<br/>",30);    
 
d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')

 .then(data=>
     {
let colorScale=d3.scaleOrdinal()
.range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00',
'#cab2d6','#6a3d9a','#ffff99','#b15928','#ccebc5','#ffffb3','#8dd3c7','#d9d9d9',
'#fccde5','#fdb462','#fb8072'])
               //d3.scaleOrdinal(d3.schemeCategory10)
let tree_map=d3.treemap()
          .size([width,innerHight])
          .paddingInner(1)
let root=d3.hierarchy(data)
          .sum(d=>+d.value)
          //to arrange by size 
          .sort(function(a, b) { return b.height - a.height || b.value - a.value; });        
     tree_map(root).descendants()
let cell=svg.selectAll('g')
          .data(root.leaves())
          .enter()
          .append('g')
          .attr('transform',d=>`translate(${d.x0},${d.y0})`);
let rectCell=cell.append('rect')
          .attr('width',d=>d.x1-d.x0)
          .attr('height',d=>d.y1-d.y0)
          .attr('fill',d=> colorScale(d.parent.data.name))// parent is important to group by category
          .attr('class','tile')
          .attr('data-name',d=>d.data.name)
          .attr('data-category',d=>d.data.category)
          .attr('data-value',d=>d.data.value);
    // text can't be added to rectangle directly it should be added 
    //by create 'g' 
    // append rect and foreignObject separatly from g
    cell.append('foreignObject')
         .attr("width", d=>d.x1-d.x0)
         .attr("height",70)
         .append("xhtml:svg")
         .style("font", "11px 'Helvetica Neue'")
         .html(d=>"<div>"+d.data.name+"</div>")
         .attr('class','txtRct');
     //tooltip
    cell.merge(rectCell)
     .append('title')
     .html(d=>{return('Name: '+d.data.name+'\n'
     +'Category: '+ d.data.category+'\n'
     +'Value: '+d.data.value)})
     .attr('id','tooltip')
     .attr('data-value',d=>d.data.value)
      
svg.call(
     colorLegend,{
         colorScale,
         spacing:150,
         innerHight
          }
     )
     }
 )


