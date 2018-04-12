'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _tween = require('./tween.js');

var _tween2 = _interopRequireDefault(_tween);

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 */
function setScope(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

var msPerFrame = 1000 / 60;
var maxAnimateTime = 1000;

/**
 * 图片默认展示模式：宽度等于屏幕宽度，高度等比缩放；水平居中，垂直居中或者居顶（当高度大于屏幕高度时）
 * 图片实际尺寸： actualWith, actualHeight
 * 图片初始尺寸： originWidth, originHeight
 * 坐标位置：left, top
 * 放大倍数：zoom
 * 最大放大倍数：maxZoomNum
 * 坐标关系：-(maxZoomNum - 1) * originWidth / 2 < left < 0
 *         -(maxZoomNum - 1) * originHeight / 2 < top < 0
 * 尺寸关系：width = zoom * originWidth
 *         heigth = zoom * originHeight
 * 
 * 放大点位置关系：
 * 初始点位置：oldPointLeft, oldPointTop
 * 放大后位置：newPointLeft, newPointTop
 * 对应关系： newPointLeft = zoom * oldPointLeft
 *          newPointTop = zoom * oldPointTop
 * 
 * 坐标位置：left = startLeft + (newPointLeft - oldPointLeft) = (zoom - 1) * oldPointLeft
 *         top = startTop + (newPointTop - oldPointTop) = (zoom - 1) * oldPointTop
 */

var ImageContainer = function (_PureComponent) {
  _inherits(ImageContainer, _PureComponent);

  function ImageContainer() {
    _classCallCheck(this, ImageContainer);

    var _this = _possibleConstructorReturn(this, (ImageContainer.__proto__ || Object.getPrototypeOf(ImageContainer)).call(this));

    _this.state = {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      isLoading: false,
      isLoaded: false
    };

    _this.handleTouchStart = function (event) {
      console.info("handleTouchStart");
      event.preventDefault();
      if (_this.animationID) {
        _raf2.default.cancel(_this.animationID);
      }
      switch (event.touches.length) {
        case 1:
          var targetEvent = event.touches[0];
          _this.startX = targetEvent.clientX;
          _this.startY = targetEvent.clientY;

          _this.startLeft = _this.state.left;
          _this.startTop = _this.state.top;

          // if(this.state.width === this.originWidth){
          //   this.callHandleStart()
          // }
          _this.onTouchStartTime = new Date().getTime();
          _this.isTap = true;
          break;

        case 2:
          //两个手指

          //设置手双指模式
          _this.isTwoFingerMode = true;

          //计算两个手指中间点屏幕上的坐标
          var middlePointClientLeft = Math.abs(Math.round((event.touches[0].clientX + event.touches[1].clientX) / 2));
          var middlePointClientTop = Math.abs(Math.round((event.touches[0].clientY + event.touches[1].clientY) / 2));

          //保存图片初始位置和尺寸
          _this.startLeft = _this.state.left;
          _this.startTop = _this.state.top;
          _this.startWidth = _this.state.width;
          _this.startHeight = _this.state.height;

          //计算手指中间点在图片上的位置（坐标值）
          _this.oldPointLeft = middlePointClientLeft - _this.startLeft;
          _this.oldPointTop = middlePointClientTop - _this.startTop;

          var dx = event.touches[0].clientX - event.touches[1].clientX;
          var dy = event.touches[0].clientY - event.touches[1].clientY;
          _this._touchZoomDistanceStart = _this._touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
          break;
        default:
          break;
      }
    };

    _this.handleTouchMove = function (event) {
      event.preventDefault();

      switch (event.touches.length) {
        case 1:
          var targetEvent = event.touches[0],
              diffX = targetEvent.clientX - _this.startX,
              diffY = targetEvent.clientY - _this.startY;

          _this.diffX = diffX;
          _this.diffY = diffY;
          //判断是否移动
          if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
            _this.isTap = false;
          }

          //图片宽度等于初始宽度，直接调用 handleMove 函数
          if (_this.state.width === _this.originWidth) {
            if (_this.props.handleMove) {
              // this.callHandleStart();
              // this.props.handleMove(diffX);
              _this.callHandleMove(diffX);
            }
          } else {
            _this.setState(function (prevState, props) {
              var top = (props.screenHeight - prevState.height) / 2,
                  left = _this.startLeft + diffX;

              if (prevState.height > props.screenHeight) {
                top = setScope(_this.startTop + diffY, props.screenHeight - prevState.height, 0);
              }
              console.info("left = %s, this.originWidth - prevState.width = %s", left, _this.originWidth - prevState.width);
              //存在 handleMove 函数
              if (props.handleMove) {
                if (left < _this.originWidth - prevState.width) {
                  // this.callHandleStart();
                  // props.handleMove(left + prevState.width - this.originWidth);
                  _this.callHandleMove(left + prevState.width - _this.originWidth);
                } else if (left > 0) {
                  // this.callHandleStart();
                  // props.handleMove(left);
                  _this.callHandleMove(left);
                }
              }

              left = setScope(left, _this.originWidth - prevState.width, 0);

              console.info("this.startX = %s, this.startY = %s, this.startLeft = %s, this.startTop = %s, diffX = %s, diffY = %s", _this.startX, _this.startY, _this.startLeft, _this.startTop, diffX, diffY);
              return {
                left: left,
                top: top
              };
            });
          }

          break;

        case 2:
          //两个手指
          var dx = event.touches[0].clientX - event.touches[1].clientX;
          var dy = event.touches[0].clientY - event.touches[1].clientY;
          _this._touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

          var zoom = Math.sqrt(_this._touchZoomDistanceEnd / _this._touchZoomDistanceStart);

          _this.setState(function (prevState, props) {
            var left = _this.startLeft + (1 - zoom) * _this.oldPointLeft,
                top = _this.startTop + (1 - zoom) * _this.oldPointTop,
                width = zoom * _this.startWidth,
                height = zoom * _this.startHeight;

            console.info("zoom = %s, left = %s, top = %s, width = %s, height = %s ", zoom, left, top, width, height);
            return {
              left: left,
              top: top,
              width: width,
              height: height
            };
          });
          break;

        default:
          break;
      }
    };

    _this.handleTouchEnd = function (event) {
      console.info("handleTouchEnd", event.touches.length);
      event.preventDefault();

      if (_this.isTwoFingerMode) {
        //双指操作结束
        var touchLen = event.touches.length;
        _this.isTwoFingerMode = false;

        if (touchLen === 1) {
          var targetEvent = event.touches[0];
          _this.startX = targetEvent.clientX;
          _this.startY = targetEvent.clientY;
        }

        _this.setState(function (prevState, props) {
          var left = void 0,
              top = void 0,
              width = void 0,
              height = void 0,
              zoom = void 0;

          width = setScope(prevState.width, _this.originWidth, props.maxZoomNum * _this.originWidth);
          height = setScope(prevState.height, _this.originHeight, props.maxZoomNum * _this.originHeight);

          zoom = width / _this.startWidth;
          left = setScope(_this.startLeft + (1 - zoom) * _this.oldPointLeft, _this.originWidth - width, 0);

          if (height > props.screenHeight) {
            top = setScope(_this.startTop + (1 - zoom) * _this.oldPointTop, props.screenHeight - height, 0);
          } else {
            top = (props.screenHeight - height) / 2;
          }

          if (touchLen === 1) {
            _this.startLeft = left;
            _this.startTop = top;
            console.info("this.startX = %s, this.startY = %s, this.startLeft = %s, this.startTop = %s", _this.startX, _this.startY, _this.startLeft, _this.startTop);
          }

          console.info("zoom = %s, left = %s, top = %s, width=%s, height= %s", zoom, left, top, width, height);
          return {
            width: width,
            height: height,
            left: left,
            top: top
          };
        });
      } else {
        //单指结束（ontouchend）
        var diffTime = new Date().getTime() - _this.onTouchStartTime,
            diffx = _this.diffX,
            diffy = _this.diffY;
        // diffx = this.state.left - this.startLeft,
        // diffy = this.state.top - this.startTop;
        console.info("diffx = %s, diffy = %s", diffx, diffy);
        if (diffTime < 100 && _this.isTap) {
          _this.context.onClose();
        } else {
          _this.callHandleEnd(diffy < 30);

          if (diffTime < maxAnimateTime / 2) {
            var x = void 0,
                y = void 0;

            //使用相同速度算法
            x = diffx * maxAnimateTime / diffTime + _this.startLeft;
            y = diffy * maxAnimateTime / diffTime + _this.startTop;
            //使用 y = A * x + b; 其中 x = diffTime 两个点（500，1）(100, 5) 带入计算得出
            // x = diffx * (-3/400 * diffTime + 19/4) + this.startLeft;
            // y = diffy * (-3/400 * diffTime + 19/4) + this.startTop;

            x = setScope(x, _this.originWidth - _this.state.width, 0);

            if (_this.state.height > _this.props.screenHeight) {
              y = setScope(y, _this.props.screenHeight - _this.state.height, 0);
            } else {
              y = _this.state.top;
            }
            console.info("this.state.height = %s, screenHeight = %s,", _this.state.height, _this.props.screenHeight);
            console.info("diffTime=%s, diffx = %s, diffy = %s, startLeft = %s, startTop=%s, x = %s, y = %s", diffTime, diffx, diffy, _this.startLeft, _this.startTop, x, y);
            _this.animateStartValue = {
              x: _this.state.left,
              y: _this.state.top
            };
            _this.animateFinalValue = {
              x: x,
              y: y
            };
            _this.animateCurTime = 0;
            _this.startAnimate();
          }
        }
      }
    };

    _this.startAnimate = function () {
      _this.animationID = (0, _raf2.default)(function () {
        var left = _tween2.default.easeOutQuart(_this.animateCurTime, _this.animateStartValue.x, _this.animateFinalValue.x, maxAnimateTime),
            top = _tween2.default.easeOutQuart(_this.animateCurTime, _this.animateStartValue.y, _this.animateFinalValue.y, maxAnimateTime);

        _this.setState({
          left: left,
          top: top
        });
        //add Time 
        _this.animateCurTime += msPerFrame;
        // console.info("startAnimate left= %s, top = %s, this.animateCurTime = %s", left, top, this.animateCurTime);
        //animate complete
        if (_this.animateCurTime > maxAnimateTime) {
          _this.setState(function (prevState, props) {
            left = setScope(prevState.left, _this.originWidth - prevState.width, 0);

            if (prevState.height > props.screenHeight) {
              top = setScope(prevState.top, props.screenHeight - prevState.height, 0);
            } else {
              top = (props.screenHeight - prevState.height) / 2;
            }
            console.info("end animate left= %s, top = %s", left, top);
            return {
              left: left,
              top: top
            };
          });
        } else {
          _this.startAnimate();
        }
      });
    };

    _this.callHandleMove = function (diffX) {
      if (!_this.isCalledHandleStart) {
        _this.isCalledHandleStart = true;
        if (_this.props.handleStart) {
          _this.props.handleStart();
        }
      }
      _this.props.handleMove(diffX);
    };

    _this.callHandleEnd = function (isAllowChange) {
      if (_this.isCalledHandleStart) {
        _this.isCalledHandleStart = false;
        if (_this.props.handleEnd) {
          _this.props.handleEnd(isAllowChange);
        }
      }
    };

    _this.onLoad = function () {
      _this.actualWith = _this.img.width;
      _this.actualHeight = _this.img.height;

      var _this$props = _this.props,
          screenHeight = _this$props.screenHeight,
          screenWidth = _this$props.screenWidth;


      var left = 0,
          top = 0;

      _this.originWidth = screenWidth;
      _this.originHeight = _this.actualHeight / _this.actualWith * screenWidth;

      if (_this.actualHeight / _this.actualWith < screenHeight / screenWidth) {
        top = parseInt((screenHeight - _this.originHeight) / 2);
      }
      _this.originTop = top;

      _this.setState({
        width: _this.originWidth,
        height: _this.originHeight,
        left: left,
        top: top,
        isLoading: false,
        isLoaded: true
      });
    };

    _this.onError = function () {
      _this.setState({
        isLoading: false,
        isLoaded: true
      });
    };

    _this.loadImg = function (url) {
      _this.img = new Image();
      _this.img.src = url;
      _this.img.onload = _this.onLoad;
      _this.img.onerror = _this.onError;

      _this.setState({
        isLoading: true,
        isLoaded: false
      });
    };

    _this.unloadImg = function () {
      delete _this.img.onerror;
      delete _this.img.onload;
      delete _this.img.src;
      delete _this.img;
    };

    _this.actualHeight = 0; //图片实际高度
    _this.actualWith = 0; //图片实际宽度

    _this.originHeight = 0; //图片默认展示模式下高度
    _this.originWidth = 0; //图片默认展示模式下宽度

    _this.startHeight = 0; //开始触摸操作时的高度
    _this.startWidth = 0; //开始触摸操作时的宽度
    _this.startLeft = 0; //开始触摸操作时的 left 值
    _this.startTop = 0; //开始触摸操作时的 top 值

    _this.onTouchStartTime = 0; //单指触摸开始时间
    _this.isTap = false; //是否为 Tap 事件

    _this.isTwoFingerMode = false; //是否为双指模式
    _this.oldPointLeft = 0; //计算手指中间点在图片上的位置（坐标值）
    _this.oldPointTop = 0; //计算手指中间点在图片上的位置（坐标值）
    _this._touchZoomDistanceStart = 0; //用于记录双指距离

    _this.animationID = 0;
    _this.animateCurTime = 0;
    _this.animateStartValue = {
      x: 0,
      y: 0
    };
    _this.animateFinalValue = {
      x: 0,
      y: 0
    };
    return _this;
  }

  _createClass(ImageContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.loadImg(this.props.src);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unloadImg();
      if (this.animationID) {
        _raf2.default.cancel(this.animationID);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          screenWidth = _props.screenWidth,
          screenHeight = _props.screenHeight,
          src = _props.src,
          left = _props.left;

      var _state = this.state,
          isLoaded = _state.isLoaded,
          isLoading = _state.isLoading,
          ImageStyle = _objectWithoutProperties(_state, ['isLoaded', 'isLoading']);

      var defaultStyle = {
        left: left,
        width: screenWidth,
        height: screenHeight
      };

      return _react2.default.createElement(
        'div',
        {
          className: 'viewer-image-container',
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd,
          style: defaultStyle },
        isLoaded ? _react2.default.createElement('img', { src: src, style: ImageStyle }) : _react2.default.createElement(_Loading2.default, null)
      );
    }
  }]);

  return ImageContainer;
}(_react.PureComponent);

ImageContainer.propTypes = {
  maxZoomNum: _propTypes2.default.number.isRequired,
  handleStart: _propTypes2.default.func,
  handleMove: _propTypes2.default.func,
  handleEnd: _propTypes2.default.func
};
ImageContainer.contextTypes = {
  onClose: _propTypes2.default.func
};
exports.default = ImageContainer;