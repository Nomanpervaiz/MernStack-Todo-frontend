import { Flex, Spin } from 'antd';

const Spinner = ({className}) => (
  <Flex align="center" className={className} gap="middle">
        <Spin size="large" />
  </Flex>
);

export default Spinner;