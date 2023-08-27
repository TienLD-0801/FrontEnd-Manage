import './ListPriceWrapper.scss';

const ListPriceWrapper = () => {
  // function formatCash(str) {
  //   return str
  //     .split('')
  //     .reverse()
  //     .reduce((prev, next, index) => {
  //       return (index % 3 ? next : next + ',') + prev;
  //     });
  // }
  return (
    //TODO update later
    <div className="wrapperListprice">
      <h1 className="title">Bảng giá </h1>
      <table>
        <thead>
          <tr>
            <th>Dịch vụ</th>
            <th>Giá</th>
          </tr>
        </thead>
        {/* <tbody>
          {DATA_PRICELIST.map((e) => (
            <tr key={e.id}>
              <td data-column="First Name">{e.title}</td>
              <td data-column="Last Name">
                {formatCash(String(e.price[0]))}{' '}
                {e.price[1] ? '-  ' + formatCash(String(e.price[1])) : ''} vnd
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>

      <h2 className="title"> GÍA MỘT SỐ COMBO </h2>
      {/* <Row>
        {DATA_COMBO.map((e) => (
          <Col className="wrapperColum" key={e.id}>
            <img src={e.image} alt="" />
            <div className="comboTitle">{e.title} </div>
            <div
              className="comboPrice
      "
            >
              {formatCash(String(e.price))}vnd{' '}
            </div>
          </Col>
        ))}
      </Row> */}
    </div>
  );
};

export default ListPriceWrapper;
