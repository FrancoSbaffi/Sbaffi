import React, { Component } from "react";

class LiveClockUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      date: new Date(),
      isVisible: false,
      scrambleText: "",
      scrambleComplete: false
    };
    
    this.chars = "0123456789:";
    this.scrambleDuration = 2000; // 2 seconds of scramble
    this.delay = 2000; // 2 seconds delay before appearing
  }

  componentDidMount() {
    // Check if this is the first visit to Home page
    const hasVisitedHome = localStorage.getItem('hasVisitedHome');
    
    if (hasVisitedHome) {
      // If already visited, show immediately without scramble
      this.setState({ 
        isVisible: true, 
        scrambleComplete: true 
      });
    } else {
      // First visit - show with delay and scramble
      setTimeout(() => {
        this.setState({ isVisible: true });
        this.startScramble();
      }, this.delay);
    }
    
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    if (this.scrambleInterval) {
      clearInterval(this.scrambleInterval);
    }
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  startScramble() {
    const targetTime = this.state.date.toLocaleTimeString();
    let iterations = 0;
    const maxIterations = 20;
    
    this.scrambleInterval = setInterval(() => {
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(this.scrambleInterval);
        this.setState({ 
          scrambleText: targetTime,
          scrambleComplete: true 
        });
        return;
      }
      
      const scrambled = targetTime
        .split('')
        .map((char, index) => {
          if (char === ':') return ':';
          if (char === ' ') return ' ';
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');
      
      this.setState({ scrambleText: scrambled });
    }, 100);
  }

  render() {
    const { isVisible, scrambleText, scrambleComplete, date } = this.state;
    
    if (!isVisible) {
      return null;
    }

    // Show scramble text during scramble, then show live time
    const displayText = scrambleComplete ? date.toLocaleTimeString() : scrambleText;

    return (
      <div style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#fff',
        textShadow: '0 0 10px rgba(255,255,255,0.5)'
      }}>
        <p>{displayText}</p>
      </div>
    );
  }
}

export default LiveClockUpdate;
