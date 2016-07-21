export const getCurrentFlowName = state => state.ui.currentFlow.name;
export const getCurrentFlowStep = state => state.ui.currentFlow.step;
export const inFlow = state => !! getCurrentFlowName( state );
