import React, { useEffect, useRef } from 'react';
import './BlocksBackground.css';

const BlocksBackground = () => {
  const blockContainerRef = useRef(null);
  const blockSize = 50;

  useEffect(() => {
    const createBlocks = () => {
      if (!blockContainerRef.current) return;
      
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const numCols = Math.ceil(screenWidth / blockSize);
      const numRows = Math.ceil(screenHeight / blockSize);
      const numBlocks = numCols * numRows;

      // Clear existing blocks
      blockContainerRef.current.innerHTML = '';

      for (let i = 0; i < numBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.dataset.index = i;
        block.addEventListener("mousemove", highlightRandomNeighbors);
        blockContainerRef.current.appendChild(block);
      }
    };

    const handleMouseMove = (e) => {
      if (!blockContainerRef.current) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const blocks = blockContainerRef.current.children;
      
      Array.from(blocks).forEach((block, index) => {
        const rect = block.getBoundingClientRect();
        const blockCenterX = rect.left + rect.width / 2;
        const blockCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - blockCenterX, 2) + Math.pow(mouseY - blockCenterY, 2)
        );
        
        const maxDistance = 150;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        
        if (intensity > 0) {
          block.style.transform = `scale(${1 + intensity * 0.05})`;
          block.style.backgroundColor = `rgba(255, 255, 255, ${0.8 + intensity * 0.15})`;
          block.style.borderColor = `rgba(0, 0, 0, ${0.05 + intensity * 0.1})`;
        } else {
          block.style.transform = 'scale(1)';
          block.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
          block.style.borderColor = 'rgba(0, 0, 0, 0.05)';
        }
      });
    };

    const highlightRandomNeighbors = function() {
      const index = parseInt(this.dataset.index);
      const screenWidth = window.innerWidth;
      const numCols = Math.ceil(screenWidth / blockSize);
      const numRows = Math.ceil(screenHeight / blockSize);
      const numBlocks = numCols * numRows;
      
      const neighbors = [
        index - 1,
        index + 1,
        index - numCols,
        index + numCols,
        index - numCols - 1,
        index - numCols + 1,
        index + numCols - 1,
        index + numCols + 1,
      ].filter(
        (i) =>
          i >= 0 &&
          i < numBlocks &&
          Math.abs((i % numCols) - (index % numCols)) <= 1
      );

      this.classList.add("highlight");
      setTimeout(() => {
        this.classList.remove("highlight");
      }, 500);

      shuffleArray(neighbors)
        .slice(0, 1)
        .forEach((nIndex) => {
          const neighbor = blockContainerRef.current.children[nIndex];
          if (neighbor) {
            neighbor.classList.add("highlight");
            setTimeout(() => {
              neighbor.classList.remove("highlight");
            }, 500);
          }
        });
    };

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    createBlocks();

    // Handle resize and mouse move
    const handleResize = () => {
      createBlocks();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="blocks-container">
      <div id="blocks" ref={blockContainerRef}></div>
    </div>
  );
};

export default BlocksBackground; 