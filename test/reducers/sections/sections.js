import { expect } from 'chai';
import reducer, { status } from '../../../src/reducers/sections/sections';
import { actionTypes, loadTags } from '../../../src/reducers/sections/actionCreators';

const initialState = { status: status.LOADED, sections: [] };
const sections = [
  {
    "id": 12,
    "title": "Section 1",
    "chapters": [
      {
        "id": 124,
        "title": "Some chapter"
      }
    ]
  }
];

describe('sections loading', () => {

  it('must create valid empty state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('must handle start of request', () => {
    const originalState = initialState;
    const requestAction = { type: actionTypes.REQUEST };
    const state = reducer(originalState, requestAction);
    expect(state).to.eql({ status: status.LOADING, sections: [] });
  });

  it('must handle successful loading of the request', () => {
    const originalState = initialState;
    const successAction = { type: actionTypes.SUCCESS, payload: sections };
    const state = reducer(originalState, successAction);
    expect(state).to.eql({ status: status.LOADED, sections });
  });

  it('must handle successful loading of the request', () => {
    const originalState = { status: status.LOADED, sections };
    const successAction = { type: actionTypes.ERROR };
    const state = reducer(originalState, successAction);
    expect(state).to.eql({ status: status.ERROR, sections });
  });

});
