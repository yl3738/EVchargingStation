
    
    
    
    


// Create svg and initial bars

  var w = 500;
  var h = 400;
  var margin = {top: 25, right: 0, bottom: 25,
      left: 25};
  var innerWidth = w - margin.left - margin.right;
  var innerHeight = h - margin.top - margin.bottom;

  var bardata = [40, 10, 11, 28, 27, 171, 112, 175, 234];
  

  var xScale = d3.scaleBand()
      .domain(d3.range(bardata.length))
      .range([0, innerWidth])
      .paddingInner(0.1);

  var yScale = d3.scaleLinear()
      .domain([0, d3.max(bardata)])
      .range([innerHeight, 0]);

  var xAxis = d3.axisBottom()
      .scale(xScale)
      .tickFormat((d, i) => [2011,2012,2013,2014,2015,2016,2017,2018,2019][i]);

  var yAxis = d3.axisLeft()
      .scale(yScale);

// add svg

  var svg = d3.select("div#plot")
    .append("svg")
      .attr("width", w)
      .attr("height", h);

// add background rectangle

  svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "lightblue");

// add bars as a group

  var bars = svg.append("g")
      .attr("id", "plot")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
    .selectAll("rect")
      .data(bardata);

  bars.enter().append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d))
      .attr("fill", "blue");

// add axes

  svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .call(yAxis);




// General Update Pattern
  function update(data) {
      xScale.domain(d3.range(data.length));

      yScale.domain([0, d3.max(data)]);

      var bars = svg.select("g")
          .selectAll("rect")
          .data(data);

      bars.enter()
        .append("rect")
          .attr("x", w)
          .attr("y", d => yScale(d))
          .attr("width", xScale.bandwidth())
          .attr("height", d => innerHeight - yScale(d))
          .attr("fill", "blue")
        .merge(bars)
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attr("x", (d, i) => xScale(i))
          .attr("y", d => yScale(d))
          .attr("width", xScale.bandwidth())
          .attr("height", d => innerHeight - yScale(d))

      bars.exit().remove();

      svg.select(".xAxis")
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .call(xAxis);

      svg.select(".yAxis")
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .call(yAxis);
    }
    
    
    
  // Interactivity

    d3.selectAll("p")
        .on("click", function() {

            var paraID = d3.select(this).attr("id");

            if (paraID == "change") {
                bardata = [1.61, 34.57, 45.32, 46.44, 37.45, 65.02, 119.98, 172.06, 123.43];

            } ;

            update(bardata);

        });
    
    