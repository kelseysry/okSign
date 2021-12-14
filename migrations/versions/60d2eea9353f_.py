"""empty message

Revision ID: 60d2eea9353f
Revises: 9db6c21f49ce
Create Date: 2021-12-12 21:26:09.136902

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '60d2eea9353f'
down_revision = '9db6c21f49ce'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('conversations', 'date',
               existing_type=sa.DATE(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('conversations', 'date',
               existing_type=sa.DATE(),
               nullable=True)
    # ### end Alembic commands ###