import createBindings, { SetCtx } from '@ecurry/immer-connect';
import * as React from 'react';

interface IFibonacciState {
  seq: number[];
}
const initialState: IFibonacciState = { seq: [0, 1] };
const { Provider, connect } = createBindings(initialState);

const FibonacciDisplay = (props: IFibonacciDisplayProps) => (
  <div>
    <div>{props.seq.join(' ')}</div>
    <button onClick={props.next}>Next</button>
  </div>
);

type IFibonacciDisplayProps = ReturnType<typeof mapToProps>;
const mapToProps = (ctx: IFibonacciState, setCtx: SetCtx<IFibonacciState>) => ({
  seq: ctx.seq,
  next: () =>
    setCtx(s => {
      const last = s.seq.length - 1;
      s.seq.push(s.seq[last] + s.seq[last - 1]);
    })
});
const FibonacciContainer = connect(mapToProps)(FibonacciDisplay);

const FibonacciExample = () => (
  <Provider>
    <FibonacciContainer />
  </Provider>
);

export default FibonacciExample;
