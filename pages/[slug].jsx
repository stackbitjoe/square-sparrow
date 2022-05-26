
import { getPage, getAllPageSlugs, getAbTestPage } from '../api/cf';
import { getComponent } from '../src/components';
import withVariants from '../src/components/VariantSwap';

const Page = getComponent('Page');

let COOKIE_NAME = '_gaexp';

export default withVariants(Page);

// export async function getStaticPaths() {
//     const slugs = await getAllPageSlugs();

//     const paths = slugs.map((slug) => ({
//         params: {
//             slug
//         },
//     }));

//     return {
//         paths,
//         fallback: true,
//     }
// }

export async function getServerSideProps(context) {
    let cookie = context.req.cookies[COOKIE_NAME]
    let runningExperiement = {};

    if(cookie) {
      let experiments = cookie.replace('GAX1.1.', '').split('!');
      experiments.map((experiment, index) => {
        let details = experiment.split('.');
        runningExperiement = {
          id: details[0],
          variant: details[2]
        }
  
        console.log(runningExperiement);
      });
    }


    let {params} = context;
    let page = await getPage(params.slug);

    if(!page) {
        page = await getAbTestPage(params.slug);
    }

    return {
        props: {
            page,
            selectedVariant: runningExperiement.variant ?? null
        },
    };
}
