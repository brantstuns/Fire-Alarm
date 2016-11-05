import Hello from '../../client/components/hello'

describe('Hello', function () {
  it('should render an h1', function () {
    this.render(<Hello/>);
    expect(this.$container.find('h1').text()).toEqual('Hello')
  });
});

