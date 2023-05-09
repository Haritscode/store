import '../../scss/categoriesCard.scss'
export default function CategoryCard({data}) {
  let name=data?.categoryName?.split(" ")[0];
  return (
    <>
    <div className='Category_card'>
      <img className='category_img' src={data.categoryImage} alt="sorry!" />
      <p>{name}</p>
    </div>
    </>
  )
}
