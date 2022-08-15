import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'flowbite/src/components/carousel';
import SliderControls from './slider.controls';
import SliderIndicators from './slider.indicators';

function Slider({ items }) {
  const itemsRef = useRef([]);
  const carouselRef = useRef(null);
  const [selectedIndicator, setSelectedIndicator] = useState(0);

  useEffect(() => {
    const items = itemsRef.current?.map((item, index) => ({ el: item, position: index }));
    const options = {
      activeItemPosition: 1,
      interval: 3000,

      indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items,
      },
    };
    carouselRef.current = new Carousel(items, options);
  }, []);

  const onNext = () => {
    carouselRef.current.next();
    setSelectedIndicator((prev) => indicatorIncrement(prev));
  };

  const onPrev = () => {
    carouselRef.current.prev();
    setSelectedIndicator((prev) => indicatorDecrement(prev));
  };

  const handleIndicators = (id) => {
    carouselRef.current.slideTo(id);
    setSelectedIndicator(id);
  };

  const indicatorIncrement = (num) => {
    const incremented = num + 1;
    if (incremented > items.length - 1) {
      return 0;
    }
    return incremented;
  };

  const indicatorDecrement = (num) => {
    const decremented = num - 1;
    if (decremented < 0) {
      return items.length - 1;
    }
    return decremented;
  };

  return (
    <>
      <div id="default-carousel" className="relative" data-carousel="slide">
        <div className="overflow-hidden relative h-[40rem] 2xl:h-[35rem] xl:h-[30rem] lg:h-[25rem] md:h-[20rem] sm:h-[20rem] rounded-lg">
          {items?.map((item, index) => (
            <div
              key={index}
              className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20"
              data-carousel-item=""
              ref={(el) => itemsRef.current.push(el)}
            >
              <img
                src={item}
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                alt="..."
              />
            </div>
          ))}
        </div>

        <SliderIndicators items={items} selected={selectedIndicator} handleIndicators={handleIndicators} />
        <SliderControls onNext={onNext} onPrev={onPrev} />
      </div>
    </>
  );
}

Slider.propTypes = {
  items: PropTypes.array,
};

export default Slider;
