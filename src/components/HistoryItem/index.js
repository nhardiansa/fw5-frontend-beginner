import { Component } from 'react';
import Button from '../Button';
import style from './style.module.css';

export default class HistoryItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  onClick (e) {
    const { id } = e.target;
    if (id === 'historyItem' || id === 'historyImg') {
      this.setState({
        clicked: !this.state.clicked
      });
    }
  }

  render () {
    const { clicked } = this.state;
    const {
      image,
      name,
      startRent,
      returned,
      payment,
      classNameContainer,
      classNameImage,
      detailClicked,
      deleteClicked,
      historyId
    } = this.props;

    const notPaidText = payment ? 'Not returned yet' : 'Not paid yet';
    return (
      <div
        onClick={this.onClick.bind(this)}
        id='historyItem'
        className={`${classNameContainer} ${style.historyItem} d-flex align-items-center position-relative`}
      >
        <div className={`${style.detailWrapper} ${clicked ? style.detailWrapperClicked : ''} d-flex align-items-center position-relative`}>
          <img
            id='historyImg'
            src={image}
            alt={image}
            className={`${classNameImage} ${style.image} me-3`}
          />
          <div className="">
            <h3 className="fw-bold fs-5 text-capitalize">{name}</h3>
            <p className="fs-6">{startRent}</p>
            <p className="fs-5 fw-bold">Prepayment : Rp. 245.000</p>
            {
              returned
                ? (
                <p className="text-success fs-6">Has been returned</p>
                  )
                : (
                <p className="text-danger fs-6">{notPaidText}</p>
                  )
            }
          </div>
        </div>
        <div className={`${style.button} ${this.state.clicked ? style.clicked : ''} position-absolute d-flex flex-column`}>
          <Button className='my-1 py-2 px-3' id={historyId} onClick={detailClicked} >Detail</Button>
          <Button className='my-1 py-2 px-3' id={historyId} variant={'dangerBtn'} onClick={deleteClicked} >Delete</Button>
        </div>
      </div>
    );
  }
}
