import { useRouter } from 'next/router';
import { CategoryType } from '../../database';

const useCategoryPage = () => {

    const router = useRouter();


    const handleCategoryChange = (destCat: CategoryType|null) => {
        if(!destCat) {
        router.push(
            {
            pathname: '/shop/category'
            }, 
            undefined, { shallow: true }
            );
        }
        else {
        router.push(
            {
            pathname: `/shop/category/${destCat.slug}`
            }, 
            undefined, { shallow: true }
        );
        }
    }

    return {
        handleCategoryChange
    }

}

export default useCategoryPage;