import {
  trigger,
  animate,
  transition,
  style,
  state,
  keyframes,
} from '@angular/animations';

const slidingTime = 500;

/**
 * Анимация плавного выезда справа налево
 */
export const slidingRightAnimation = trigger('slidingRight', [
  state(
    'in',
    style({
      opacity: 0,
      transform: 'translateX(0)',
    })
  ),
  transition('void => *', [
    animate(
      slidingTime,
      keyframes([
        style({
          transform: 'translateX(300px)',
          opacity: '0',
          offset: '0',
        }),
        style({
          transform: 'translateX(250px)',
          opacity: '0.25',
          offset: '0.25',
        }),
        style({
          transform: 'translateX(200px)',
          opacity: '0.5',
          offset: '0.5',
        }),
        style({
          transform: 'translateX(100px)',
          opacity: '0.75',
          offset: '0.75',
        }),
        style({
          transform: 'translateX(0px)',
          opacity: '1',
          offset: '1',
        }),
      ])
    ),
  ]),
  transition('* => void', [
    animate(
      slidingTime,
      keyframes([
        style({
          transform: 'translateX(0px)',
          opacity: '1',
          offset: '0',
        }),
        style({
          transform: 'translateX(100px)',
          opacity: '0.75',
          offset: '0.25',
        }),
        style({
          transform: 'translateX(200px)',
          opacity: '0.5',
          offset: '0.5',
        }),
        style({
          transform: 'translateX(250px)',
          opacity: '0.25',
          offset: '0.75',
        }),
        style({
          transform: 'translateX(300px)',
          opacity: '0',
          offset: '1',
        }),
      ])
    ),
  ]),
]);

/**
 * Анимация плавного выезда слева направо
 */
export const slidingLeftAnimation = trigger('slidingLeft', [
  state(
    'in',
    style({
      opacity: 0,
      transform: 'translateX(0)',
    })
  ),
  transition('void => *', [
    animate(
      slidingTime,
      keyframes([
        style({
          transform: 'translateX(-300px)',
          opacity: '0',
          offset: '0',
        }),
        style({
          transform: 'translateX(-250px)',
          opacity: '0.25',
          offset: '0.25',
        }),
        style({
          transform: 'translateX(-200px)',
          opacity: '0.5',
          offset: '0.5',
        }),
        style({
          transform: 'translateX(-100px)',
          opacity: '0.75',
          offset: '0.75',
        }),
        style({
          transform: 'translateX(0px)',
          opacity: '1',
          offset: '1',
        }),
      ])
    ),
  ]),
  transition('* => void', [
    animate(
      slidingTime,
      keyframes([
        style({
          transform: 'translateX(0px)',
          opacity: '1',
          offset: '0',
        }),
        style({
          transform: 'translateX(-100px)',
          opacity: '0.75',
          offset: '0.25',
        }),
        style({
          transform: 'translateX(-200px)',
          opacity: '0.5',
          offset: '0.5',
        }),
        style({
          transform: 'translateX(-250px)',
          opacity: '0.25',
          offset: '0.75',
        }),
        style({
          transform: 'translateX(-300px)',
          opacity: '0',
          offset: '1',
        }),
      ])
    ),
  ]),
]);
