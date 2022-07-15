function changeTheme(e) {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

document.querySelector('.themes').addEventListener('click', changeTheme, false);

var datajson = {
  "nodes": [
    {"id": "Machine Learning", "group": 1, "size": 6},
    {"id": "Supervised Learning", "group": 4, "size": 4},
    {"id": "Unsupervised Learning", "group": 7, "size": 4},
    {"id": "Reinforcement Learning", "group": 10, "size": 4},
    {"id": "Dimensionality Reduction", "group": 15, "size": 4},
    {"id": "Ensemble Learning", "group": 19, "size": 4},
    {"id": "Independent Component Analysis", "group": 14, "size": 2},
    {"id": "Linear Discriminant Analysis", "group": 14, "size": 2},
    {"id": "Principal Component Analysis", "group": 14, "size": 2},
    {"id": "Factor Analysis", "group": 14, "size": 2},
    {"id": "Feature Extraction", "group": 14, "size": 2},
    {"id": "Feature Selection", "group": 14, "size": 2},
    {"id": "Partial Least Squares Regression", "group": 14, "size": 2},
    {"id": "AdaBoost", "group": 18, "size": 2},
    {"id": "Boosting", "group": 18, "size": 2},
    {"id": "Gradient Boosted Decision Tree", "group": 18, "size": 2},
    {"id": "Gradient Boosting Machine", "group": 18, "size": 2},
    {"id": "Q-learning", "group": 10, "size": 2},
    {"id": "State–action–reward–state–action", "group": 10, "size": 2},
    {"id": "Temporal Difference Learning", "group": 10, "size": 2},
    {"id": "Learning Automata", "group": 10, "size": 2},
    {"id": "Gaussian Process Regression", "group": 3, "size": 2},
    {"id": "Artificial Neural Network", "group": 3, "size": 2},
    {"id": "Logistic Model Tree", "group": 3, "size": 2},
    {"id": "Support Vector Machines", "group": 3, "size": 2},
    {"id": "Random Forests", "group": 3, "size": 2},
    {"id": "k-Nearest Neighbor", "group": 3, "size": 2},
    {"id": "Naive Bayes", "group": 3, "size": 2},
    {"id": "Hidden Markov Models", "group": 3, "size": 2},
    {"id": "K-means Algorithm", "group": 6, "size": 2},
    {"id": "Mixture Models", "group": 6, "size": 2},
    {"id": "Hierarchical Clustering", "group": 6, "size": 2},
    {"id": "Neural Networks", "group": 6, "size": 2},
    {"id": "Method of Moments", "group": 6, "size": 2},

  ],
  "links": [
    {"source": "Machine Learning", "target": "Supervised Learning"},
    {"source": "Machine Learning", "target": "Reinforcement Learning"},
    {"source": "Machine Learning", "target": "Unsupervised Learning"},
    {"source": "Machine Learning", "target": "Reinforcement Learning"},
    {"source": "Machine Learning", "target": "Dimensionality Reduction"},
    {"source": "Machine Learning", "target": "Ensemble Learning"},
    {"source": "Dimensionality Reduction", "target": "Independent Component Analysis"},
    {"source": "Dimensionality Reduction", "target": "Linear Discriminant Analysis"},
    {"source": "Dimensionality Reduction", "target": "Principal Component Analysis"},
    {"source": "Dimensionality Reduction", "target": "Factor Analysis"},
    {"source": "Dimensionality Reduction", "target": "Feature Extraction"},
    {"source": "Dimensionality Reduction", "target": "Feature Selection"},
    {"source": "Dimensionality Reduction", "target": "Partial Least Squares Regression"},
    {"source": "Ensemble Learning", "target": "AdaBoost"},
    {"source": "Ensemble Learning", "target": "Boosting"},
    {"source": "Ensemble Learning", "target": "Gradient Boosted Decision Tree"},
    {"source": "Ensemble Learning", "target": "Gradient Boosting Machine"},
    {"source": "Reinforcement Learning", "target": "Q-learning"},
    {"source": "Reinforcement Learning", "target": "State–action–reward–state–action"},
    {"source": "Reinforcement Learning", "target": "Temporal Difference Learning"},
    {"source": "Reinforcement Learning", "target": "Learning Automata"},
    {"source": "Supervised Learning", "target": "Gaussian Process Regression"},
    {"source": "Supervised Learning", "target": "Artificial Neural Network"},
    {"source": "Supervised Learning", "target": "Logistic Model Tree"},
    {"source": "Supervised Learning", "target": "Support Vector Machines"},
    {"source": "Supervised Learning", "target": "Random Forests"},
    {"source": "Supervised Learning", "target": "k-Nearest Neighbor"},
    {"source": "Supervised Learning", "target": "Naive Bayes"},
    {"source": "Supervised Learning", "target": "Hidden Markov Models"},
    {"source": "Unsupervised Learning", "target": "K-means Algorithm"},
    {"source": "Unsupervised Learning", "target": "Mixture Models"},
    {"source": "Unsupervised Learning", "target": "Hierarchical Clustering"},
    {"source": "Unsupervised Learning", "target": "Neural Networks"},
    {"source": "Unsupervised Learning", "target": "Method of Moments"}
  ]
}

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

//TODO make svg responsive
d3.select("div#chartId")
    .append("div")
    .classed("svg-container", true) //container class to make  responsive svg
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 400")
    //class to make it responsive
    .classed("svg-content-responsive", true);

var color = d3.scaleOrdinal(d3.schemeCategory20c);
var nodeRadius = 20;

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) {
        return d.id;
    }).distance(80))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(function(d) {
        return nodeRadius + 0.5; }).iterations(4))

    simulation.nodes(datajson.nodes);
    simulation.force("link").links(datajson.links);

    var link = svg.append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(datajson.links)
        .enter().append("line");

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(datajson.nodes)
        .enter().append("circle")

    //Setting node radius by group value. If 'group' key doesn't exist, set radius to 9
    .attr("r", function(d) {
            if (d.hasOwnProperty('group')) {
                return d.size * 2;
            } else {
                return 9;
            }
        })
        //Colors by 'group' value
        .style("fill", function(d) {
            return color(d.group);
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("svg:title")
        .attr("dx", -80)
        .attr("dy", ".5em")
        .text(function(d) {
            return d.id
        });

    var labels = svg.append("g")
        .attr("class", "label")
        .selectAll("text")
        .data(datajson.nodes)
        .enter().append("text")
        .attr("dx", 12)
        .attr("dy", ".5em")
        .style("font-size", 13)
        .text(function(d) {
            return d.id
        });


    simulation
        .nodes(datajson.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(datajson.links);

  function ticked() {

    link.attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        });

    node
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        });
    labels
        .attr("x", function(d) {
            return d.x;
        })
        .attr("y", function(d) {
            return d.y;
        });
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
