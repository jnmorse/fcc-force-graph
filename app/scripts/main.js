const width = 900
const height = 900
const countryJson = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'

d3.json(countryJson, (error, graph) => {
  if (error) { return console.error('Could not load data') }

  console.log(graph)

  const svg = d3.select('.chart').append('svg')
    .attr('width', 600)
    .attr('height', 600)
    .attr('viewBox', `0,0,${width},${height}`)

  const force = d3.layout.force()
    .size([width, height])
    .charge(-120)
    .linkDistance(32 * 2)

  force
    .nodes(graph.nodes)
    .links(graph.links)
    .start()

  const link = svg.selectAll('.link')
    .data(graph.links)
    .enter().append('line')
      .attr('class', 'link')
      .style('stroke', 'black')
      .style('stroke-width', d => Math.sqrt(d.value))

  const node = svg.selectAll('.node')
    .data(graph.nodes).enter()
    .append('image')
      .attr('class', 'node')
      .attr('href', d => `images/${d.code.toUpperCase()}.png`)
      .attr('width', 32)
      .attr('height', 32)
      .call(force.drag)

  force.on('tick', function() {
    link.attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
    node.attr('x', d => (d.x - 16))
      .attr('y', d=> (d.y - 16))
  })
})
