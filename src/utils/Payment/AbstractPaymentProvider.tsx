import GooglePlayProvider from "./GooglePlayProvider";
import StripePaymentProvider from "./StripePaymentProvider";

export default abstract class AbstractPaymentProvider {

    public abstract getProducts(): Promise<Product[]>;

    public abstract pay(product: Product): Promise<Product>;

    public abstract checkIfPaymentIsPossible(log: Function): Promise<boolean>;
}