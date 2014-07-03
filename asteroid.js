;(function(exports) {
  var Asteroid = function(game, center) {
    this.game = game;
    this.center = center;
    this.velocity = { x: randomVelocity(), y: randomVelocity() };
    this.resetPoints();
    this.resetLineSegments();
  };

  Asteroid.prototype = {
    update: function() {
      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
      this.resetPoints();
      this.resetLineSegments();
      this.game.wrapScreen(this);
    },

    draw: function(screen) {
      screen.lineWidth = 2;
      screen.strokeStyle = '#aaa';
      screen.fillStyle = '#000';
      screen.beginPath();
      screen.moveTo(this.points[0].x, this.points[0].y);
      for (var i = 1; i < this.points.length; i++) {
        screen.lineTo(this.points[i].x, this.points[i].y);
      }
      screen.closePath();
      screen.stroke();
      screen.fill();
    },

    resetPoints: function() {
      this.points = [
        { x: this.center.x -  5, y: this.center.y - 15 },
        { x: this.center.x - 15, y: this.center.y -  8 },
        { x: this.center.x - 12, y: this.center.y -  2 },
        { x: this.center.x - 17, y: this.center.y      },
        { x: this.center.x - 16, y: this.center.y + 10 },
        { x: this.center.x -  5, y: this.center.y + 15 },
        { x: this.center.x     , y: this.center.y + 10 },
        { x: this.center.x +  5, y: this.center.y + 15 },
        { x: this.center.x + 10, y: this.center.y +  8 },
        { x: this.center.x +  8, y: this.center.y +  3 },
        { x: this.center.x + 15, y: this.center.y      },
        { x: this.center.x +  8, y: this.center.y - 14 },
      ];
    },

    resetLineSegments: function() {
      this.lineSegments = [];
      var self = this;
      this.points.forEach(function(point, i, points) {
        if (i !== points.length - 1) {
          self.lineSegments.push({ p1: points[i], p2: points[i + 1] });
        } else {
          self.lineSegments.push({ p1: points[i], p2: points[0] });
        }
      });
    }
  };

  function randomVelocity() {
    var rand = Math.random();
    if (rand < 0.5) return -rand;
    return rand;
  }

  exports.Asteroid = Asteroid;
})(this);