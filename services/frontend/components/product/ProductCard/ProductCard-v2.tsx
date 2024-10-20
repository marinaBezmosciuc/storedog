import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { Product } from '@customTypes/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import usePrice from '@lib/hooks/usePrice'
import ProductTag from '../ProductTag'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

export const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <div className={`${rootClassName} product-item`}>
      {variant === 'slim' && (
        <>
          <div className={s.header}>
            <Link href={`/products/${product.slug}`}>
              <a aria-label={product.name}>{product.name}</a>
            </Link>
          </div>
          {product?.images && (
            <div>
              <Image
                quality="85"
                src={product.images[0]?.url || placeholderImg}
                alt={product.name || 'Product Image'}
                height={320}
                width={320}
                layout="fixed"
                {...imgProps}
                priority
              />
            </div>
          )}
        </>
      )}

      {variant === 'simple' && (
        <>
          {!noNameTag && (
            <div className={s.header}>
              <h3 className={s.name}>
                <Link href={`/products/${product.slug}`}>
                  <a aria-label={product.name} className={s.link}>
                    {product.name}
                  </a>
                </Link>
              </h3>
              <div className={s.price}>
                {`${price} ${product.price?.currencyCode}`}
              </div>
            </div>
          )}
          <div className={s.imageContainer}>
            {product?.images && (
              <div>
                <Image
                  alt={product.name || 'Product Image'}
                  className={s.productImage}
                  src={product.images[0]?.url || placeholderImg}
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                  priority
                />
              </div>
            )}
          </div>
        </>
      )}

      {variant === 'default' && (
        <>
          <Link href={`/products/${product.slug}`}>
            <a aria-label={product.name}>
              <ProductTag
                name={product.name}
                price={`${price} ${product.price?.currencyCode}`}
              />
            </a>
          </Link>

          <div className={s.imageContainer}>
            {product?.images && (
              <div>
                <Image
                  alt={product.name || 'Product Image'}
                  className={s.productImage}
                  src={product.images[0]?.url || placeholderImg}
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                  priority
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ProductCard
