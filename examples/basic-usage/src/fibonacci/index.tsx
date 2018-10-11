import createBindings, { SetCtx } from 'immer-connect';
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
    setCtx(d => {
      const last = d.seq.length - 1;
      d.seq.push(d.seq[last] + d.seq[last - 1]);
    })
});
const FibonacciConnected = connect(mapToProps)(FibonacciDisplay);

const FibonacciExample = () => (
  <Provider>
    <FibonacciConnected />
  </Provider>
);

export default FibonacciExample;
