import { shallow } from 'enzyme';
import SignUp from '../SignUp';

describe('SignUp component', () => {
  it('should render the form', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find('.sign-up-form')).toHaveLength(1);
  });
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />);
    wrapper.find('input[name="name"]').simulate('change', { target: { value: 'John Doe' } });
    wrapper.find('input[name="username"]').simulate('change', { target: { value: 'john.doe' } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('input[name="email"]').simulate('change', { target: { value: 'john.doe@example.com' } });
  });

  it('should update the name state when the input value changes', () => {
    expect(wrapper.find('input[name="name"]').prop('value')).toBe('John Doe');
  });

  it('should update the username state when the input value changes', () => {
    expect(wrapper.find('input[name="username"]').prop('value')).toEqual('john.doe');
  });

  it('should update the password state when the input value changes', () => {
    expect(wrapper.find('input[name="password"]').prop('value')).toEqual('password');
  });

  it('should update the email state when the input value changes', () => {
    expect(wrapper.find('input[name="email"]').prop('value')).toEqual('john.doe@example.com');
  });
});
