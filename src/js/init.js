import { medals } from "../data/medals";
import scrollama from "scrollama";
import * as d3 from "d3";
import $ from "jquery";
import images from "../img/*.png";

const windowWidth = $(window).width();
const windowHeight = $(window).height();

$(window).resize(function () {
  if (windowWidth != $(window).width() || windowHeight != $(window).height()) {
    location.reload();
    return;
  }
});

const figure = d3.select(".chart-wrapper");

// initialize the scrollama
const scroller = scrollama();
let width = figure.node().getBoundingClientRect().width;
let height = figure.node().getBoundingClientRect().height;

if (windowWidth <= 660) {
  height = width;
}

// scrollama event handlers
function handleStepEnter(response) {
  if (response.index == 0) {
    const level1 = nodes0.filter((d) => d.height === 1);

    svg
      .selectAll("circle")
      .data(nodes0)
      .join("circle")
      .attr("class", (d) => "nodes level" + d.height)
      .transition()
      .delay((d, i) => i * 7)
      .duration(500)
      .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`)
      .attr("r", (d) => d.r);

    svg
      .selectAll("text")
      .data(level1)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("font-weight", 700)
      .attr("font-size", 16)
      .transition()
      .duration(500)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5)
      .text((d) => `${d.data[0]}(${d.children.length})`);

    svg
      .selectAll("circle.level0")
      .attr("fill", (d) => medalColorScale(d.parent.data[0]))
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("id", (d, i) => "level0" + i)
      .attr("opacity", 0.7);

    svg
      .selectAll("circle.level1")
      .attr("fill", "white")
      .attr("fill", (d) => medalBgScale(d.data[0]))
      .attr("stroke", (d) => medalColorScale(d.data[0]))
      .attr("stroke-width", 1)
      .attr("id", (d, i) => "level1" + i);

    svg
      .selectAll("circle.level2")
      .attr("fill", "white")
      .attr("id", (d, i) => "level2" + i)
      .attr("stroke", "none")
      .attr("stroke-width", 1);

    svg.selectAll("circle.level3").attr("fill", "none");

    svg.selectAll("image").remove();
  }

  if (response.index == 1) {
    const level2 = nodes1.filter((d) => d.height === 2);
    svg
      .selectAll("circle")
      .data(nodes1)
      .join("circle")
      .attr("class", (d) => "nodes level" + d.height)
      .transition()
      .delay((d, i) => i * 7)
      .duration(500)
      .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`)
      .attr("r", (d) => d.r)
      .on("end", function () {
        svg.selectAll("text").raise();
      });

    svg
      .selectAll("text")
      .data(level2)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("font-weight", 700)
      .attr("font-size", 16)
      .transition()
      .duration(500)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5)
      .text((d) => d.data[0]);

    svg
      .selectAll("circle.level0")
      .attr("fill", (d) => medalColorScale(d.parent.data[0]))
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("id", (d, i) => "level0" + i)
      .attr("opacity", 0.7);

    svg
      .selectAll("circle.level1")
      .attr("fill", (d) =>
        d.children.length === 1 ? "none" : medalBgScale(d.data[0])
      )
      .attr("stroke", (d) => medalColorScale(d.data[0]))
      .attr("stroke-width", (d) => (d.children.length === 1 ? 0 : 1))
      .attr("id", (d, i) => "level1" + i);
    // .attr("class",d=>d.data[0].split(' ').join('_'))

    svg
      .selectAll("circle.level2")
      .attr("fill", "white")
      .attr("id", (d, i) => "level2" + i)
      .attr("stroke", "gray")
      .attr("stroke-width", 1);

    svg.selectAll("circle.level3").attr("stroke", "none").attr("fill", "none");

    svg
      .selectAll("image")
      .data(level2)
      .join("svg:image")
      .attr("width", 30)
      .attr("height", 30)
      .attr("xlink:href", (d) => `${images[d.data[0]]}`) //`${images[d.data[0]]}.png`
      .attr("opacity", 0.9)
      .transition()
      .duration(500)
      .attr("x", (d) => d.x - 15)
      .attr("y", (d) => d.y + 3);
  }
  if (response.index == 2) {
    //CIRCLES only properly draw if I use svg.selectAll as opposed to d3.selectAll, why
    const level2 = nodes2.filter((d) => d.height === 2);

    svg
      .selectAll("circle")
      .data(nodes2)
      .join("circle")
      .attr("class", (d) => "nodes level" + d.height)
      .transition()
      .delay((d, i) => i * 7)
      .duration(500)
      .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`)
      .attr("r", (d) => d.r)
      .on("end", function () {
        svg.selectAll("text").raise();
      });

    svg
      .selectAll("circle.level2")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 1);

    svg
      .selectAll("circle.level1")
      .attr("fill", (d) =>
        d.children.length === 1 ? "none" : medalBgScale(d.data[0])
      )
      .attr("stroke", (d) => medalColorScale(d.data[0]))
      .attr("stroke-width", (d) => (d.children.length === 1 ? 0 : 1))
      .attr("id", (d, i) => "level1" + i);

    svg
      .selectAll("circle.level0")
      .attr("fill", (d) => medalColorScale(d.parent.data[0]))
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("id", (d, i) => "level0" + i)
      .attr("opacity", 0.7);

    svg.selectAll("circle.level3").attr("fill", "none");

    svg
      .selectAll("text")
      .data(level2)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("font-weight", 700)
      .attr("font-size", 16)
      .transition()
      .duration(500)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5)
      .text((d) => d.data[0]);

    svg
      .selectAll("image")
      .data(level2)
      .join("svg:image")
      .attr("width", 40)
      .attr("height", 40)
      .attr("xlink:href", (d) => `${images[d.data[0]]}`)
      .transition()
      .duration(500)
      .attr("x", (d) => d.x - 20)
      .attr("y", (d) => d.y - 50);
  }

  if (response.index == 3) {
    const level2 = nodes3.filter((d) => d.height === 2);

    svg.selectAll("image").remove();

    svg
      .selectAll("circle")
      .data(nodes3)
      .join("circle")
      .attr("class", (d) => "nodes level" + d.height)
      .transition()
      .delay((d, i) => i * 7)
      .duration(500)
      .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`)
      .attr("r", (d) => d.r);

    svg
      .selectAll("circle.level2")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 1);

    svg
      .selectAll("circle.level1")
      .attr("fill", (d) =>
        d.children.length === 1 ? "none" : medalBgScale(d.data[0])
      )
      .attr("stroke", (d) => medalColorScale(d.data[0]))
      .attr("stroke-width", (d) => (d.children.length === 1 ? 0 : 1))
      .attr("id", (d, i) => "level1" + i);

    svg
      .selectAll("circle.level0")
      .attr("fill", (d) => medalColorScale(d.parent.data[0]))
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("id", (d, i) => "level0" + i)
      .attr("opacity", 0.7);

    svg
      .selectAll("text")
      .data(level2)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("font-weight", 700)
      .attr("font-size", 14)
      .transition()
      .duration(500)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5)
      .text((d) => d.data[0]);

    svg.selectAll("circle.level3").attr("fill", "none");
  }
}

function init() {
  scroller
    .setup({
      step: ".scene",
      offset: 0.85,
      debug: false,
      progress: false,
    })
    .onStepEnter(handleStepEnter);
}

init();

// Prepare our physical space
const svg = d3
  .select("#chart1")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const medalColorScale = d3
  .scaleOrdinal()
  .domain(["Gold", "Silver", "Bronze"])
  .range(["#dfc27d", "#bababa", "#a6611a"]);

const medalBgScale = d3
  .scaleOrdinal()
  .domain(["Gold", "Silver", "Bronze"])
  .range(["#fbf9f3", "#f8f8f8", "#f5efe9"]);

function prepDataGroup(data, var1, var2, var3) {
  const reduceFn = (data) => d3.sum(data, (d) => d.n);
  let groupingFns;
  if (var3) {
    groupingFns = [(d) => d[var1], (d) => d[var2], (d) => d[var3]];
  } else {
    groupingFns = [(d) => d[var1], (d) => d[var2]];
  }
  const rollupData = d3.rollup(data, reduceFn, ...groupingFns);
  const childrenAccessorFn = ([key, value]) => value.size && Array.from(value);
  return d3
    .hierarchy([null, rollupData], childrenAccessorFn)
    .sum(([key, value]) => value)
    .sort((a, b) => b.value - a.value);
}

const hierarchyData0 = prepDataGroup(medals, "Medal", "id", null);
const root0 = d3
  .pack()
  .size([width - 2, height - 2])
  .padding(10)(hierarchyData0);
const nodes0 = root0.descendants();

const hierarchyData1 = prepDataGroup(medals, "Year", "Medal", "id");
const root1 = d3
  .pack()
  .size([width - 2, height - 2])
  .padding(10)(hierarchyData1);
const nodes1 = root1.descendants();

const hierarchyData2 = prepDataGroup(medals, "Sport", "Medal", "id");
const root2 = d3
  .pack()
  .size([width - 2, height - 2])
  .padding(10)(hierarchyData2);
const nodes2 = root2.descendants();

const hierarchyData3 = prepDataGroup(medals, "Gender", "Medal", "id");
const root3 = d3
  .pack()
  .size([width - 2, height - 2])
  .padding(10)(hierarchyData3);
const nodes3 = root3.descendants();

const level1 = nodes0.filter((d) => d.height === 1);

svg
  .selectAll("circle")
  .data(nodes0)
  .join("circle")
  .attr("class", (d) => "nodes level" + d.height)
  .transition()
  .duration(500)
  .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`)
  .attr("r", (d) => d.r);

svg
  .selectAll("text")
  .data(level1)
  .join("text")
  .attr("text-anchor", "middle")
  .attr("font-weight", 700)
  .attr("font-size", 16)
  .attr("x", (d) => d.x)
  .attr("y", (d) => d.y + 5)
  .text((d) => `${d.data[0]}(${d.children.length})`);

svg
  .selectAll("circle.level0")
  .attr("fill", (d) => medalColorScale(d.parent.data[0]))
  .attr("stroke", "white")
  .attr("stroke-width", 1)
  .attr("id", (d, i) => "level0" + i)
  .attr("opacity", 0.8);

svg
  .selectAll("circle.level1")
  .attr("fill", (d) => medalBgScale(d.data[0]))
  .attr("stroke", (d) => medalColorScale(d.data[0]))
  .attr("stroke-width", 1)
  .attr("id", (d, i) => "level1" + i);

svg
  .selectAll("circle.level2")
  .attr("fill", "white")
  .attr("id", (d, i) => "level2" + i)
  .attr("stroke", "none")
  .attr("stroke-width", 1);

svg.selectAll("circle.level3").attr("fill", "none");
