import { Col, Row } from 'antd';
import React from 'react'

export interface StoreDeatilProps {
    storeId: number;
  }

const StoreDetail: React.FC<StoreDeatilProps> = () => {
  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <div>
            <p className="text-[1.2rem] font-bold">Cửa hàng A</p>
          </div>
          <div>
            <table>
              <tr>
                <td>Quản lí:</td>
                <td>Dương Bảo</td>
              </tr>
              <tr>
                <td>Địa chỉ:</td>
                <td>
                  Phú Mỹ, Vũng Tàu
                </td>
              </tr>
              <tr>
                <td>Mã số thuế:</td>
                <td>
                  1234567890
                </td>
              </tr>
              <tr>
                <td>Mô tả:</td>
                <td>
                  Đây là mô tả ...
                </td>
              </tr>
            </table>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default StoreDetail