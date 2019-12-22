

export const colorLegend=(selection,props)=>{
const {
    colorScale, 
    spacing,
    innerHight
}=props

const groups =    selection.selectAll('.gk')
    .data(colorScale.domain())
    .attr('id','legend');
   
const groupEnter=  groups
   .enter().append('g')
   .attr('class','gk');
          
groupEnter // we should start it here to avoid overlap
   .merge(groups )
   .attr('transform',(d, i)=>i<6? `translate( ${i*spacing},${innerHight})`:
   i<12?`translate( ${(i-6)*spacing},${innerHight+40})`:`translate( ${(i-12)*spacing},${innerHight+80})`
   );  //i *30 to make sequnce unoverlaped rect 

groupEnter
    .append('rect')          
     .merge(groups.select('.k') )
        .attr('fill',colorScale)
        .attr('x',70)
        .attr('y',20)
        .attr('width',30)
        .attr('height',30)
        .attr('stroke','black')
        .attr('class','legend-item')

groupEnter
        .append('text')          
         .merge(groups.select('text') )
         .text(d=>d)
         .attr('class','txtK')
        .attr('transform',d=>`translate( 105,40)`);  
}