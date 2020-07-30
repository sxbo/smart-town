import React, {SFC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import './NumberCard.scss';
import '../../theme/style/dashboard/common.scss';

export interface DataCardProp{
    icon: ReactNode
    num: number
    text: string
}

const DataCard: SFC<DataCardProp> = (props) => {
  const {icon, num, text} = props;

  return (
    <div className="card-box data-card">
      <div>
        {icon}
      </div>
      <div>
        <div>
          {num}
        </div>
        <div>
          {text}
        </div>
      </div>
    </div>
  );
};

DataCard.propTypes = {
  icon: PropTypes.node.isRequired,
  num: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default DataCard;

