import {
  trigger,
  animate,
  transition,
  style,
  state,
  keyframes,
  query,
  animateChild,
  group,
} from '@angular/animations';

const slidingTime = 500;

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

export const imgAnimation = trigger('position', [
  state(
    'in',
    style({
    })
  ),
  transition('void => *', [
    animate(
      slidingTime,
      keyframes([
        style({
          position: 'absolute',
          left: '25%',
          width: '10%',
          opacity: '0',
          offset: '0',
        }),
        style({
          width: '25%',
          opacity: '0.25',
          offset: '0.25',
        }),
        style({
          width: '50%',
          opacity: '0.5',
          offset: '0.5',
        }),
        style({
          width: '75%',
          opacity: '0.75',
          offset: '0.75',
        }),
        style({
          width: '100%',
          opacity: '1',
          offset: '1',
        }),
      ])
    ),
  ]),
]);

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
      ]),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]);