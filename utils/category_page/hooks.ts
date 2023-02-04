import { useRouter } from 'next/router';
import { CategoryType } from '../../database';

const useCategoryPage = () => {

    const router = useRouter();


    const handleCategoryChange = (currentCat: CategoryType|null) => {
        if(!currentCat) {
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
            pathname: `/shop/category/${currentCat.slug}`
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