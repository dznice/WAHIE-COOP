import { transition, state, trigger, animate, style } from '@angular/animations';

export let formState = trigger('formState', [
    state('hide', style({opacity: 0, display: 'none',})),
    state('show', style({})),
    transition('show <=> hide', 
    animate('1500ms ease-in-out', 
    style({ opacity: 0, transform: 'translateX(200px)'  })))
  ])

  export let formState2 =  trigger('formState2', [
    state('hide', style({opacity: 1, display: 'none',})),
    state('show', style({opacity: 1,})),
    transition('show <=> hide', 
    animate('500ms ease-in-out', 
    style({ opacity: 0, transform: 'translateX(-420px)'  })))
  ])

  export let formState3 = trigger('formState3', [
    state('hide', style({opacity: 0, display: 'none',})),
    state('show', style({opacity: 1, display: 'block',})),
    transition('show <=> hide', 
    animate('1500ms  ease-in-out', 
    style({ opacity: 0, transform: 'translateX(-190px)'  })))
  ])

  export let formState4 = trigger('formState4', [
    state('hide', style({opacity: 0, display: 'none',})),
    state('show', style({opacity: 1,})),
    transition('show <=> hide', 
    animate('1500ms ease-in-out', 
    style({ opacity: 1, transform: 'translateX(420px)'  })))
  ])

  export let formState5 = trigger('formState5', [
    state('hide', style({opacity: 0, display: 'none',})),
    state('show', style({opacity: 1,})),
    transition('show <=> hide', 
    animate('500ms ease-in-out', 
    style({ opacity: 1, transform: 'translateX(0px)'  })))
  ])

  export let formState6 = trigger('formState6', [
    state('hide', style({opacity: 0, display: 'none',})),
    state('show', style({opacity: 1,})),
    transition('show <=> hide', 
    animate('1500ms ease-in-out', 
    style({ opacity: 0, transform: 'translateX(200px)'  })))
  ])
  
  export let slideleft = trigger('slideleft', [
    transition(':enter', [
      style({ opacity: 1, transform: 'translateX(-420px)'}),
      animate('1200ms ease-in-out',
        style({ opacity: 1, transform: 'translateY(0)'})
      ),
    ]),
    transition(':leave', [
      animate('1200ms ease-in-out',
        style({ opacity: 0, transform: 'translateX(-230px)'})
      ),
    ]),
  ])

  export let slideright = trigger('slideright', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(530px)'}),
      animate('1200ms ease-in-out',
        style({ opacity: 1, transform: 'translateY(0)'})
      ),
    ]),
    transition(':leave', [
      animate('1200ms ease-in-out',
        style({ opacity: 0, transform: 'translateX(230px)'})
      ),
    ]),
  ])


  export let slideleft2 = trigger('slideleft2', [
    transition(':enter', [
      style({ opacity: 1, transform: 'translateX(420px)'}),
      animate('1200ms ease-in-out',
        style({ opacity: 1, transform: 'translateY(0)'})
      ),
    ]),
    transition(':leave', [
      animate('1200ms ease-in-out',
        style({ opacity: 0, transform: 'translateX(230px)'})
      ),
    ]),
  ])

  export let slideright2 = trigger('slideright2', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-530px)'}),
      animate('1200ms ease-in-out',
        style({ opacity: 1, transform: 'translateY(0)'})
      ),
    ]),
    transition(':leave', [
      animate('1200ms ease-in-out',
        style({ opacity: 0, transform: 'translateX(-230px)'})
      ),
    ]),
  ])

  export let slider = trigger('slider', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(0px)'}),
      animate('1200ms ease-in-out',
        style({ opacity: 1, transform: 'translateY(0)'})
      ),
    ]),
    transition(':leave', [
      animate('1200ms ease-in-out',
        style({ opacity: 0, transform: 'translateX(0px)'})
      ),
    ]),
  ])