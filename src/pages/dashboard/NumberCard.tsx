import React, {SFC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import './NumberCard.scss';
import '../../theme/style/common.scss';

export interface DataCardProp{
    icon: ReactNode
    num: number
    text: string
}

const DataCard: SFC<DataCardProp> = (props) => {
  const {icon, num, text} = props;

  return (
    <div className="card-box data-card">
      <div className="data-card-box">
        <div className="icon-box">
          {icon}
        </div>
        <div className="data-text-box">
          <div>
            <div className="num-card-number">
              {num}
            </div>
            <div className="num-card-text">
              {text}
            </div>
          </div>
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

