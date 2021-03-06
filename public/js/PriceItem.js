var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var PriceItem = React.createClass({displayName: "PriceItem",
    
    componentDidMount: function() {
      this.setState({ mounted: true });
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        priceIncrease: nextProps.calc_value > this.props.calc_value,
        priceFlat: nextProps.calc_value === this.props.calc_value
      });
    },
    
    getInitialState: function() {
        return {
            img_src: this.props.img_src,
            key: this.props.key,
            label: this.props.label,
            calc_value: this.props.calc_value,
            mounted: false,
            priceFlat: true
        };
    },
    render: function() {
        var transitionDirection = this.state.priceIncrease ? "Up" : "Down";
        if ( this.state.priceFlat ) {
            transitionName = 'priceChangeFlat'
        }
        else {
            transitionName = "priceChange" + transitionDirection;
        }
        var child = this.state.mounted ?
      	React.createElement("div", {key: this.props.calc_value}, React.createElement("span", {className: "ticker"}, React.createElement("div", null, React.createElement("ul", {className:"tickeritems"}, React.createElement("li", null, React.createElement("img", {src: this.props.img_src, className:"tickeritems"})), React.createElement("li", null, this.props.label, ":  ", this.props.calc_value || '?', "  "))))):
        null;

        return (
            React.createElement(ReactTransitionGroup, {transitionName: transitionName, transitionEnterTimeout:500, transitionLeaveTimeout:300},
              child
            )
        );
    }
});
