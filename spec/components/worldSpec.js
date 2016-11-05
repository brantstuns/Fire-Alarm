import World from '../../client/components/world'

describe('World', function () {
  it('should render an h1', function () {
    this.render(<World/>);
    expect(this.$container.find('h1').text()).toEqual('World')
  });
});