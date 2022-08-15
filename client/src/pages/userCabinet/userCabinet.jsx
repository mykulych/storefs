import React from 'react';
import { Outlet } from 'react-router-dom';
import { Cart } from '../../components/ui';
import { useModal } from '../../hooks';
import GroupItem from '../../components/common/groupList/groupItem/groupItem';
import { useSelector } from 'react-redux';
import { getAccountData } from '../../store/account/account.selectors';
import { customHistory } from '../../utils/helpers';

function UserCabinet() {
  const currentUser = useSelector(getAccountData());
  const { showModal } = useModal();

  const handleCabinetItems = ({ id }) => {
    customHistory.push(`/cabinet/${id}`);
  };

  const cartModal = () => showModal({ title: 'Cart', closable: true, content: <Cart />, width: '1000px' });

  return (
    <div className="container mx-auto flex">
      <div className="pr-[20%]">
        <div className="w-[18%] h-full fixed pt-6 border-r border-gray-200 dark:border-gray-600">
          <ul className="w-full pr-2 text-gray-900 dark:text-white">
            <div className="mb-1 border-b border-gray-200 dark:border-gray-600">
              <GroupItem
                item={{ icon: 'faUser', id: 'personal-data', name: `${currentUser.name} ${currentUser.surname}` }}
                onClick={handleCabinetItems}
              />
            </div>
            <GroupItem item={{ icon: 'faListCheck', id: 'orders', name: 'Orders' }} onClick={handleCabinetItems} />
            <GroupItem
              item={{ icon: 'faCircleCheck', id: 'published-ads', name: 'Published ads' }}
              onClick={handleCabinetItems}
            />
            <GroupItem item={{ icon: 'faHeart', id: 'wishlist', name: 'Wish list' }} onClick={handleCabinetItems} />
            <GroupItem item={{ icon: 'faCartShopping', id: 'cart', name: 'Cart' }} onClick={cartModal} />
          </ul>
        </div>
      </div>
      <div className="w-full pt-6">
        <Outlet />
      </div>
    </div>
  );
}

export default UserCabinet;
